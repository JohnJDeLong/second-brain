import { Response } from 'express';
import prisma from '../lib/prisma.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const createItem = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { title, url, rawContent, selectedText, userNote } = req.body;

        if (!title || !url || !rawContent) {
            return res.status(400).json({ error: 'title, url, and rawContent are required'});
        }

        const item = await prisma.savedItem.create({
            data: {
                userId: req.user.id, 
                title, 
                url,
                rawContent, 
                selectedText, 
                userNote,
            },
        });
        
        return res.status(201).json({ item }); 

    } catch (error) {
        console.error('CREATE ITEM ERROR:', error );
        return res.status(500).json({ error: 'Failed to create item'})

    }

};

export const getItems = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const items = await prisma.savedItem.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
        });

        return res.status(200).json({ items }); 

    } catch (error) {
        console.error('GET ITEMS ERROR:', error); 
        return res.status(500).json({ error: 'Failed to fetch items' });
    }
};

export const getItemById = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const id = req.params.id as string;

    const item = await prisma.savedItem.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res.status(200).json({ item });
  } catch (error) {
    console.error('GET ITEM BY ID ERROR:', error);
    return res.status(500).json({ error: 'Failed to fetch item' });
  }
};
