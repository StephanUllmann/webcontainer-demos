import { Author } from '../models/author.model.ts';
import { Book } from '../models/book.model.ts';

export class AuthorService {
  static async createAuthor(data: any) {
    const author = new Author(data);
    return await author.save();
  }

  static async getAuthors(query: any = {}, options: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.name) {
      filter.name = { $regex: query.name, $options: 'i' };
    }
    if (query.nationality) {
      filter.nationality = query.nationality;
    }

    const authors = await Author.find(filter).skip(skip).limit(limit).sort({ name: 1 }).lean().exec();
    const total = await Author.countDocuments(filter).exec();

    return {
      authors,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async getAuthorById(id: string) {
    return await Author.findById(id).lean().exec();
  }

  static async updateAuthor(id: string, data: any) {
    return await Author.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean().exec();
  }

  static async deleteAuthor(id: string) {
    // Optional: Check if author has books before deleting or delete books too
    return await Author.findByIdAndDelete(id).exec();
  }
}
