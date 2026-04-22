import { Request, Response, NextFunction} from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import { signToken } from "../utils/jwt.js";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { AppError } from "../types/errors.js";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { email, password } = req.body; 
        if (!email || !password) {
            const err = new Error("Email and password are required") as AppError;
            err.status = 400;
            err.log = "authController.signup: missing email or password";
            return next(err);
        }
        
        const existingUser = await prisma.user.findUnique({
            where: {email},
        });

        if (existingUser) {
            const err = new Error("Email already in use") as AppError;
            err.status = 400;
            err.log = `authController.signup: email already in use (${email})`;
            return next(err);
        }

        const passwordHash = await bcrypt.hash(password,10); 

        const user = await prisma.user.create({
            data: {
                email, 
                passwordHash,
            },
        });

        const token  = signToken(user.id);

        return res.status(201).json({
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (error) {
        return next(error);
    }
};

export const login  = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { email, password } = req.body; 
        if (!email || !password) {
            const err = new Error("Email and password are required") as AppError;
            err.status = 400;
            err.log = "authController.login: missing email or password";
            return next(err);
        }

        const user = await prisma.user.findUnique({
            where: { email }, 
        });

        if(!user) {
            const err = new Error("Invalid credentials") as AppError;
            err.status = 401;
            err.log = `authController.login: no user found for email (${email})`;
            return next(err);
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if(!isMatch) {
            const err = new Error("Invalid credentials") as AppError;
            err.status = 401;
            err.log = `authController.login: password mismatch for email (${email})`;
            return next(err);
        }

        const token = signToken(user.id); 

        return res.status(200).json({
            token,
            user: {
                id: user.id, 
                email: user.email,
            },
        });

    } catch (error) {
       return next(error);
    }
}

export const me  = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            const err = new Error('Unauthorized') as AppError;
            err.status = 401;
            err.log = "authController.me: req.user missing" 
            return next(err);
        }
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }, 
            select: {
                id: true,
                email: true, 
                createdAt: true, 
            },
        });
        if (!user) {
            const err = new Error("User not found") as AppError;
            err.status = 404; 
            err.log = `authcontroller.me: no user found for id ${req.user.id}`;
            return next(err);
        }

        return res.status(200).json({ user }); 
    } catch (error) {
        return next(error); 
    }
};