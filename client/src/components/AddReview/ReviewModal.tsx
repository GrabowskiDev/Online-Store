import { Modal, Button, Textarea, Rating } from '@mantine/core';
import { useState, useEffect } from 'react';

interface ReviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (rating: number, reviewText: string) => void;
	initialRating?: number;
	initialReviewText?: string;
}

export default function ReviewModal({
	isOpen,
	onClose,
	onSubmit,
	initialRating = 0,
	initialReviewText = '',
}: ReviewModalProps) {
	const [rating, setRating] = useState(initialRating);
	const [reviewText, setReviewText] = useState(initialReviewText);

	useEffect(() => {
		setRating(initialRating);
		setReviewText(initialReviewText);
	}, [initialRating, initialReviewText]);

	const handleSubmit = () => {
		onSubmit(rating, reviewText);
		onClose();
	};

	return (
		<Modal opened={isOpen} onClose={onClose} title="Review">
			<Rating value={rating} onChange={setRating} fractions={2} />
			<Textarea
				value={reviewText}
				onChange={(event) => setReviewText(event.currentTarget.value)}
				placeholder="Write your review"
				minRows={4}
				mt="md"
			/>
			<Button onClick={handleSubmit} mt="md">
				Submit
			</Button>
		</Modal>
	);
}
