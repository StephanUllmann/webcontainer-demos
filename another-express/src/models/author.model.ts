import mongoose, { Schema } from 'mongoose';

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    birthDate: {
      type: Date,
    },
    nationality: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Author = mongoose.model('Author', authorSchema);
