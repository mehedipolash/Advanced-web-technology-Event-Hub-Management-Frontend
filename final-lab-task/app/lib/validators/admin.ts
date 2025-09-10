import { z } from 'zod';
export type AdminRegisterInput = z.infer<typeof adminRegisterSchema>;


export const adminRegisterSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Full name is too short')
      .max(100, 'Full name is too long')
      .regex(
        /^[A-Za-z\s]{2,100}$/,
        'Name must contain only letters and spaces'
      ),
    age: z
      .string()
      .refine(v => /^\d+$/.test(v), 'Age must be a Positive number')
      .transform(v => Number(v))
      .refine(n => n >= 18 && n <= 70, 'Age must be between 18 and 70'),

    
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email({ message: 'Invalid email address' })
      .regex(/@gmail\.com$/i, { message: 'Email must be a gmail.com address' }),

    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(d => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
