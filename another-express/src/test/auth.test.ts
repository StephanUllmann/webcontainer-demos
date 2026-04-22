import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../app.ts';

describe('Auth Endpoints', () => {
  const userPayload = {
    email: 'test@example.com',
    password: 'password123',
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(userPayload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should login and set a cookie', async () => {
    // First register
    await request(app)
      .post('/api/v1/auth/register')
      .send(userPayload);

    // Then login
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send(userPayload);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.header['set-cookie']).toBeDefined();
    expect(res.header['set-cookie'][0]).toContain('token=');
  });

  it('should not register user with same email', async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send(userPayload);

    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(userPayload);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
