import { z }  from 'zod';
const loginSchema = z.object({
    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address"})
    .min(3, { message: "Email must be at least of 3 chars" })
    .max(255, { message: "Email must not be more than 255 chars" }),

    password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least of 8 chars" })
    .max(1024, { message: "Passwords must not be more than 100 chars" })

})

const signupSchema = loginSchema.extend({
        
    name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 chars" })
    .max(100, { message: "Name must not be more than 100 chars" }),


    
});
export  {signupSchema, loginSchema};