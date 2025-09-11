import { z } from 'zod';

export const customerRegisterSchema = z
  .object({
    fullName: z.string().min(3, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().regex(/^01\d{9}$/, 'Must start with 01 and be 11 digits'),
    password: z.string().min(6, 'At least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type CustomerRegisterInput = z.infer<typeof customerRegisterSchema>;
