import { z } from 'zod';

// Registration / Creation schema
export const adminCreateSchema = z.object({
  fullName: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'At least 6 characters'),
  age: z.coerce.number().int().min(18, 'Must be 18+'),
});
export type AdminCreateInput = z.infer<typeof adminCreateSchema>;

// Update schema (no password required)
export const adminUpdateSchema = z.object({
  fullName: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email'),
  age: z.coerce.number().int().min(18, 'Must be 18+'),
});
export type AdminUpdateInput = z.infer<typeof adminUpdateSchema>;

// Login schema (optional, if you want client validation)
export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'At least 6 characters'),
});
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
