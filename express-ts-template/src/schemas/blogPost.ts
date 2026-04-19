import { z } from 'zod/v4';
import { Types } from 'mongoose';

export const blogPostInputSchema = z
  .object({
    title: z.string({ error: 'Title must be a string' }).min(1, {
      message: 'Title is required'
    }),
    content: z.string({ error: 'Content must be a string' }).min(1, {
      message: 'Content is required'
    })
  })
  .strict();

export const blogPostSchema = z
  .object({
    _id: z.instanceof(Types.ObjectId),
    ...blogPostInputSchema.shape,
    createdAt: z.date()
  })
  .strict();
