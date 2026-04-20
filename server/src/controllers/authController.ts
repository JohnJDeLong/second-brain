import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import { signToken } from "../utils/jwt.js";

export const signup = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body; 
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
        const existingUser = await prisma.user.findUnique({
            where: {email},
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use'}); 
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
        console.error('SIGNUP ERROR:', error);
        return res.status(500).json({ error: 'Failed to sign up' });
    }
};

export const login  = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body; 
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await prisma.user.findUnique({
            where: { email }, 
        });

        if(!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if(!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
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
        console.error('LOGIN ERROR:', error);
        return res.status(500).json({ error: 'Failed to log in' });
    }
}