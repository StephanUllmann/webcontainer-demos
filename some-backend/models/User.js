import { Schema, model } from 'mongoose';

const readingListSchema = new Schema({
  bookRefId: {
    type: Schema.Types.ObjectId,
    ref: 'book',
    required: true,
  },
  status: {
    type: String,
    enum: ['read', 'pending', 'waiting list', 'unknown', 'lend'],
    default: 'unknown',
  },
});

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  readingList: [readingListSchema],
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'reader', 'librarian'],
    default: 'reader',
  },
});

const User = model('user', userSchema);
export default User;
