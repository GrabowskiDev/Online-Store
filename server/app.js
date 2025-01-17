require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const PORT = 3001;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'database.db',
});

// User model
const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		firstName: {
			type: DataTypes.STRING,
		},
		lastName: {
			type: DataTypes.STRING,
		},
	},
	{
		timestamps: false,
	}
);

// Reviews model
const Review = sequelize.define('Review', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: 'id',
		},
	},
	productId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	text: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	rating: {
		type: DataTypes.NUMBER,
		allowNull: false,
	},
});

const Cart = sequelize.define('Cart', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: 'id',
		},
	},
	productId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

sequelize
	.sync()
	.then(() => {
		console.log('Database & tables created!');
		app.listen(PORT, () => {
			console.log(`it's alive on http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error('Error creating database & tables:', error);
	});

async function verifyToken(req, res, next) {
	const token = req.header('Authorization');
	if (!token)
		return res.status(403).json('A token is required for authentication');
	try {
		const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
		req.userId = decoded.id;
		req.email = decoded.email;
		const user = await User.findByPk(req.userId);
		if (user.email !== req.email) {
			return res.status(403).json('Invalid token');
		}
		next();
	} catch (error) {
		res.status(401).json('Invalid token');
	}
}

const deleteProductFromCart = async (req, res) => {
	try {
		const cart = await Cart.findOne({
			where: {
				id: req.params.id,
				userId: req.userId,
			},
		});
		if (!cart) {
			return res.status(404).send('Product not found in the cart!');
		}
		await cart.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
};

// Register
app.post('/api/register', async (req, res) => {
	try {
		const { email, password, username, firstName, lastName } = req.body;
		const userEmailExists = await User.findOne({ where: { email } });
		const userUsernameExists = await User.findOne({ where: { username } });
		if (userEmailExists) {
			return res.status(400).send('User with this email already exists');
		}
		if (userUsernameExists) {
			return res.status(400).send('User with this username already exists');
		}
		hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			email,
			password: hashedPassword,
			username,
			firstName,
			lastName,
		});
		res.status(201).json(user.id);
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Login
app.post('/api/login', async (req, res) => {
	try {
		const { email } = req.body;
		let user = await User.findOne({
			where: { email },
		});
		if (!user) {
			return res.status(404).send('User not found');
		}
		isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
		if (isPasswordCorrect) {
			const token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.SECRET_KEY,
				{ expiresIn: '7d' }
			);
			const responseUser = {
				id: user.id,
				email: user.email,
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
			};
			res.status(200).json({ token, user: responseUser });
		} else {
			res.status(401).send('Unauthorized');
		}
	} catch (error) {
		res.status(500).send('Internal Server Error' + error);
	}
});

// Verify user
app.get('/api/verify', verifyToken, (req, res) => {
	res.status(200).send('User is verified');
});

// Get basic user info
app.get('/api/user/:id', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (!user) {
			return res.status(404).send('User not found');
		}
		res.status(200).json({
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
		});
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Get all user info (SENSITIVE)
app.get('/api/user', verifyToken, async (req, res) => {
	try {
		const user = await User.findByPk(req.userId); //verifyToken should override any userId
		if (!user) {
			return res.status(404).send('User not found');
		}
		res.status(200).json({
			id: user.id,
			email: user.email,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
		});
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Change password
app.put('/api/change-password', verifyToken, async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;
		const user = await User.findByPk(req.userId);
		const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
		if (isPasswordCorrect) {
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			user.password = hashedPassword;
			await user.save();
			res.status(204).send();
		} else {
			res.status(401).send('Unauthorized');
		}
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Get all reviews
app.get('/api/reviews', async (req, res) => {
	try {
		const reviews = await Review.findAll();
		res.status(200).json(reviews);
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Get reviews by product id
app.get('/api/reviews/product/:productId', async (req, res) => {
	try {
		const reviews = await Review.findAll({
			where: {
				productId: req.params.productId,
			},
		});
		res.status(200).json(reviews);
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Get reviews by user id
app.get('/api/reviews/user/:userId', async (req, res) => {
	try {
		const reviews = await Review.findAll({
			where: {
				userId: req.params.userId,
			},
		});
		res.status(200).json(reviews);
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Create review
app.post('/api/reviews', verifyToken, async (req, res) => {
	try {
		const { productId, text, rating } = req.body;
		const userId = req.userId;
		const review = await Review.create({
			userId,
			productId,
			text,
			rating,
		});
		res.status(201).json(review);
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Delete review
app.delete('/api/reviews/:id', verifyToken, async (req, res) => {
	try {
		const review = await Review.findOne({
			where: {
				id: req.params.id,
				userId: req.userId,
			},
		});
		if (!review) {
			return res.status(404).send('Review not found');
		}
		await review.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Modify review
app.put('/api/reviews/:id', verifyToken, async (req, res) => {
	const { text, rating } = req.body;
	try {
		const review = await Review.findOne({
			where: {
				id: req.params.id,
				userId: req.userId,
			},
		});
		if (!review) {
			return res.status(404).send('Review not found');
		}
		review.text = text;
		review.rating = rating;
		await review.save();
		res.status(204).send();
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Add product to cart
app.post('/api/cart', verifyToken, async (req, res) => {
	try {
		const { productId, quantity } = req.body;
		const userId = req.userId;
		const cart = await Cart.findOne({
			where: {
				userId,
				productId,
			},
		});

		if (cart) {
			cart.quantity += quantity;
			await cart.save();
		} else {
			const cart = await Cart.create({
				userId,
				productId,
				quantity,
			});
		}
		res.status(201).json(cart);
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Delete product from cart
app.delete(
	'/api/cart/:id',
	verifyToken,
	deleteProductFromCart // <-- zdefiniowane linijka 125
);

// Modify product quantity in cart
app.put('/api/cart/:id', verifyToken, async (req, res) => {
	try {
		const quantity = req.body.quantity;

		if (quantity === 0) {
			return deleteProductFromCart(req, res);
		} else if (quantity < 0) {
			return res.status(400).send('Quantity can not be negative');
		} else {
			const cart = await Cart.findOne({
				where: {
					id: req.params.id,
					userId: req.userId,
				},
			});
			if (!cart) {
				return res.status(404).send('Product not found in the cart!');
			}
			cart.quantity = req.body.quantity;
			await cart.save();
			res.status(204).send();
		}
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Get cart by user id
app.get('/api/cart', verifyToken, async (req, res) => {
	try {
		const cart = await Cart.findAll({
			where: {
				userId: req.userId,
			},
		});

		if (!cart) {
			return res.status(404).send('Cart is empty');
		} else {
			res.status(200).json(cart);
		}
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});
