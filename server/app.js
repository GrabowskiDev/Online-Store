require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const PORT = 3001;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());

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
		// references: {
		// 	model: User,
		// 	key: 'id',
		// },
	},
	productId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	text: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

sequelize
	.sync({ force: true })
	.then(() => {
		console.log('Database & tables created!');
		app.listen(PORT, () => {
			console.log(`it's alive on http://localhost:${PORT}`);
		});
	})
	.catch(error => {
		console.error('Error creating database & tables:', error);
	});

// Register
app.post('/api/register', async (req, res) => {
	try {
		const { email, password, username, firstName, lastName } = req.body;
		const userExists = await User.findOne({ where: { email } });
		if (userExists) {
			return res.status(400).send('User already exists');
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
		const user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (user && isPasswordCorrect) {
			const token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.SECRET_KEY,
				{ expiresIn: '1h' }
			);
			res.status(200).json({ token, id: user.id });
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
app.get('/api/reviews/:productId', async (req, res) => {
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

// Create review
app.post('/api/reviews', async (req, res) => {
	try {
		const { userId, productId, text } = req.body;
		const review = await Review.create({
			userId,
			productId,
			text,
		});
		res.status(201).json(review);
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});
