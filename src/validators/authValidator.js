import { z } from 'zod';

// Validation schema for User Registration
export const registerSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address')
        .toLowerCase()
        .trim(),

    password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters long')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character (!@#$%^&*)'),

    role: z
        .enum(['USER', 'MANAGER', 'ADMIN'])
        .optional()
        .default('USER'),
});

// Validation schema for User Login
export const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address')
        .toLowerCase()
        .trim(),

    password: z
        .string({ required_error: 'Password is required' })
        .min(1, 'Password cannot be empty'),
});

/**
 * Generic validation middleware that evaluates the request body against a Zod schema
 */
export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
        }));

        return res.status(400).json({
            status: 'fail',
            message: 'Validation failed',
            errors,
        });
    }

    // Replace request body with parsed and sanitized data
    req.body = result.data;
    next();
};