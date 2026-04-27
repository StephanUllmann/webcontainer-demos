import { Book, User } from '../models/index.js';

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ data: user });
};

const getAllUsers = async (_req, res) => {
  const users = await User.find().lean();
  res.json({ data: users });
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('readingList.bookRefId');
  if (!user) throw new Error('User not found', { cause: 404 });
  res.json({ data: user });
};

const updateOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).lean();
  if (!user) throw new Error('User not found', { cause: 404 });
  res.json({ data: user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id).lean();
  if (!user) throw new Error('User not found', { cause: 404 });
  res.json({ data: user });
};

const addBookToReadingList = async (req, res) => {
  const { id } = req.params;
  const { bookRefId, status = 'pending' } = req.body;

  // if (id !== req.user._id) throw new Error("...")

  // const user = await User.findByIdAndUpdate(id, { $push: { readingList: { bookRefId } } }, { new: true });

  const bookExists = await Book.exists({ _id: bookRefId });
  if (!bookExists) throw new Error('Book not in our Library', { cause: 404 });

  const user = await User.findById(id);
  if (!user) throw new Error('User not found', { cause: 404 });

  const bookAlreadyOnReadingList = user.readingList.find((book) => book.bookRefId.toString() === bookRefId);
  if (bookAlreadyOnReadingList) throw new Error('Book already on your list', { cause: 409 });

  user.readingList.push({ bookRefId });

  await user.save();

  res.json({ data: user });
};

const updateBookStatus = async (req, res) => {
  const { id, bookId } = req.params;
  const { status } = req.body;

  // const user = await User.findOneAndUpdate(
  //   { _id: userId, 'readingList.bookRefId': bookId },
  //   { $set: { 'readingList.$.status': status } },
  //   { new: true }
  // );

  const user = await User.findById(id);
  if (!user) throw new Error('User not found', { cause: 404 });

  const book = user.readingList.find((book) => book.bookRefId.toString() === bookId);
  book.status = status;
  await user.save();
  res.json({ data: user });
};

const deleteBookFromReadingList = async (req, res) => {
  const { id, bookId } = req.params;

  //  const user = await User.findByIdAndUpdate(id, { $pull: { readingList: { bookRefId: bookId } } }, { new: true });

  const user = await User.findById(id);
  if (!user) throw new Error('User not found', { cause: 404 });

  user.readingList = user.readingList.filter((book) => book.bookRefId.toString() !== bookId);
  await user.save();
  res.json({ data: user });
};

export {
  createUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteUser,
  addBookToReadingList,
  updateBookStatus,
  deleteBookFromReadingList,
};
