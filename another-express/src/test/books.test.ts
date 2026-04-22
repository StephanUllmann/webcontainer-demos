import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import app from '../app.ts';

describe('Author and Book Endpoints', () => {
  let cookie: string;
  let authorId: string;

  const userPayload = {
    email: 'test-books-v10@example.com',
    password: 'password123',
  };

  beforeAll(async () => {
    await request(app).post('/api/v1/auth/register').send(userPayload);
    const res = await request(app).post('/api/v1/auth/login').send(userPayload);
    cookie = res.header['set-cookie'][0];
  });

  it('should create an author and a book, then retrieve them', async () => {
    // 1. Create Author
    const authorRes = await request(app)
      .post('/api/v1/authors')
      .set('Cookie', [cookie])
      .send({
        name: 'J.K. Rowling',
        bio: 'Author of Harry Potter',
        nationality: 'British',
      });

    expect(authorRes.status).toBe(201);
    authorId = authorRes.body.data._id;

    // 2. Create Book
    const bookRes = await request(app)
      .post('/api/v1/books')
      .set('Cookie', [cookie])
      .send({
        title: "Harry Potter and the Philosopher's Stone",
        isbn: '9780747532699',
        summary: 'A young wizard discovers his magical heritage',
        author: authorId,
        genres: ['Fantasy', 'Young Adult'],
      });

    expect(bookRes.status).toBe(201);
    expect(bookRes.body.data.title).toBe("Harry Potter and the Philosopher's Stone");

    // 3. Get Books (Pagination)
    const getBooksRes = await request(app).get('/api/v1/books');
    expect(getBooksRes.status).toBe(200);
    expect(getBooksRes.body.data.books).toHaveLength(1);
    expect(getBooksRes.body.data.pagination.total).toBe(1);
    expect(getBooksRes.body.data.books[0].author).toBeDefined();
  });
});
