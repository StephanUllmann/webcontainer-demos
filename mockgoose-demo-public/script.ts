import { Schema, connect, model } from '@ullmann/mockgoose';

const TestSchema = new Schema({
  bla: [String],
});

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: Number,
    test: TestSchema,
  },
  { timestamps: true }
);

// console.log(AuthorSchema.definition);

async function dbInit() {
  try {
    const res = await connect('bla!');
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

await dbInit();

const Author = model('Author', AuthorSchema);

const newbie = await Author.create({ name: 'Bob', agre: 42 });
const newbie2 = await Author.create({ name: 'Bobby', agre: 42 });

const jrr = await Author.create({ name: 'J.R.R.', age: 123 });
const jrr2 = await Author.create({ name: 'J.R.R. Warzlaw', age: 42 });
const jrr3 = await Author.create({ name: 'J.R.R. Tolkien', age: 123 });

// console.log(newbie);

const theJrr = await Author.findById('69edfe917d40daac987d628d');
// console.log(theJrr);

const reg = /j*R*r/i;
const oldJrrs = await Author.find({
  age: { $gt: 10 },
  name: { $regex: reg },
})
  .limit(4)
  .skip(1);

// console.log(JSON.stringify({ data: oldJrrs }));

const bookSchema = new Schema(
  {
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
    genres: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Book = model('Book', bookSchema);

await Book.create({
  title: 'The Silent Patient',
  isbn: '978-1250301697',
  summary:
    'A famous painter shoots her husband five times in the face and then never speaks another word.',
  author: '69ee102db6c0f2572fb79bf7',
  publishedDate: new Date('2019-02-05'),
  genres: ['Thriller', 'Mystery', 'Psychological Fiction'],
});

// Book 2
await Book.create({
  title: 'Dune',
  isbn: '978-0441172719',
  summary:
    "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange.",
  author: '69ee102da4186ae8e2db22c1',
  publishedDate: new Date('1965-08-01'),
  genres: ['Science Fiction', 'Fantasy', 'Adventure'],
});

// Book 3
await Book.create({
  title: 'Atomic Habits',
  isbn: '978-0735211292',
  summary:
    'No matter your goals, Atomic Habits offers a proven framework for improving--every day.',
  author: '69ee102d4cb6c952ccc62847',
  publishedDate: new Date('2018-10-16'),
  genres: ['Self-Help', 'Psychology', 'Non-fiction'],
});

// Book 4 (Minimal example with only the required fields + 1 optional)
await Book.create({
  title: 'Project Hail Mary',
  isbn: '978-0593135204',
  author: '69ee102da4186ae8e2db22c1',
  genres: ['Science Fiction'],
});

const updatedBook = await Book.findOneAndUpdate(
  {
    genres: { $in: ['Self-Help', 'Science Fiction'] },
  },
  {
    title: 'test',
  },
  { new: true }
);

console.log(updatedBook);

const books = await Book.find({
  genres: { $in: ['Self-Help', 'Science Fiction'] },
}).populate('author');

// console.log(books);

// const deleted = await Book.findOneAndDelete({
//   genres: { $in: ['Self-Help', 'Science Fiction'] },
// });

// console.log(deleted);
