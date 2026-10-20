import z from "zod";

export const loginScema = z.object({
    username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username is too long'),
    password: z
    .string()
    .min(6, 'Password must be at least 6 charachters')
})

export type LoginFormData = z.infer<typeof loginScema>;

export const registerSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    LastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid Email address'),
    username: z.string().min(3, 'User name must be at least 3 characters'),
    password: z
    .string()
    .min(8, 'Password must be at least 8 charachters')
    .regex(/[A-Z]/, 'Must contain uppercase letters')
    .regex(/[0-9]/, 'Must contain a number'),
    confirmationPassword: z.string()
})
.refine((data) => data.password === data.confirmationPassword, {
    message: 'Password don not match',
    path: ['confirmationPassword']
})

export const shippingSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid Email'),
    phone: z.string().min(8, 'Phone is required'),
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    postalCode: z.string().min(3, 'Postal code is required'),
    country: z.string().min(2, 'Country is required'),
})

export const paymentSchema = z.object({
    cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
    cardHolder: z.string().min(3, 'Card holder name is required'),
    expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY'),
    cvv: z.string().regex(/^\d{3,4}$/, 'Cvv must be 3-4 digits')
})


export type ShippingFormData = z.infer<typeof shippingSchema>

export type RegisterFormData = z.infer<typeof registerSchema>

export type PaymentFormData  = z.infer<typeof paymentSchema>