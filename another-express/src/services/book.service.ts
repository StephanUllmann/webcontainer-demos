import { Book } from '../models/book.model.ts';

export class BookService {
  static async createBook(data: any) {
    const book = new Book(data);
    await book.save();
    return await Book.findById(book._id).populate('author').lean().exec();
  }

  static async getBooks(query: any = {}, options: { page?: any; limit?: any } = {}) {
    const page = Math.max(1, parseInt(options.page) || 1);
    const limit = Math.max(1, parseInt(options.limit) || 10);
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.title) {
      filter.title = { $regex: query.title, $options: 'i' };
    }
    if (query.author) {
      filter.author = query.author;
    }
    if (query.genre) {
      filter.genres = query.genre;
    }

    const books = await Book.find(filter).skip(skip).limit(limit).populate('author').sort({ createdAt: -1 }).lean().exec();
    const total = await Book.countDocuments(filter).exec();

    return {
      books,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async getBookById(id: string) {
    return await Book.findById(id).populate('author').lean().exec();
  }

  static async updateBook(id: string, data: any) {
    return await Book.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('author').lean().exec();
  }

  static async deleteBook(id: string) {
    return await Book.findByIdAndDelete(id).exec();
  }
}
