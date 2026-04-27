import { Book } from '../models/index.js';

const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ data: book });
};

const getAllBooks = async (req, res) => {
  const { page, limit } = req.query;
  const parsedPage = parseInt(page) ?? 1;
  const offset = (parsedPage - 1) * limit;

  const books = await Book.find().limit(limit).skip(offset);
  res.json({ data: books });
};

const getOneBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) throw new Error('Book not found', { cause: 404 });
  res.json({ data: book });
};

const updateOneBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!book) throw new Error('Book not found', { cause: 404 });
  res.json({ data: book });
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndDelete(id);
  if (!book) throw new Error('Book not found', { cause: 404 });
  res.json({ data: book });
};

export { createBook, getAllBooks, getOneBook, updateOneBook, deleteBook };
