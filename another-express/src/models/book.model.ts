import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  summary: {
    type: String,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
    index: true,
  },
  publishedDate: {
    type: Date,
  },
  genres: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

export const Book = mongoose.model('Book', bookSchema);
