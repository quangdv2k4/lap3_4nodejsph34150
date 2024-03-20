import express from "express";
import Book from "../models/books.js";
import { bookSchema } from "../schemas/books";

const router = express.Router();

router.get("/books", async (req, res) => {
	try {
		const response = await Book.find();
		res.send(response);
	} catch (err) {
		console.log(err);
	}
});

router.post("/books", async (req, res) => {
	try {
		const bookExist = await Book.findOne({ name: req.body.name });
		if (bookExist) {
			return res.status(400).json({
				message: "Book already exists",
			});
		}
		const { error } = bookSchema.validate(req.body, { abortEarly: false });
		if (error) {
			const errs = error.details.map((e) => e.message);
			return res.status(400).json({
				message: errs,
			});
		} else {
			const newBook = await new Book(req.body).save();
			return res.status(200).json({
				message: "Created",
				data: newBook,
			});
		}
	} catch (error) {
		console.log(error);
	}
});

router.get("/books/:id", async (req, res) => {
	const response = await Book.find({ _id: req.params.id });
	res.send(response);
});

router.put("/books/:id", async (req, res) => {
	const response = await Book.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
	res.send(response);
});

export default router;
