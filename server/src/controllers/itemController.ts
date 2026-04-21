import { NextFunction, Response } from 'express';
import prisma from '../lib/prisma.js';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { AppError } from '../types/errors.js';

export const createItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
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

export const getItemById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      const err = new Error ('Unauthorized') as AppError;
      err.status = 401;
      err.log = 'itemController.getItemById: req.user missing';
      return next(err); 
    }

    const id = req.params.id as string;

    const item = await prisma.savedItem.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!item) {
        const err = new Error('Item not found') as AppError;
        err.status = 404;
        err.log = `itemController.getItemById: no item found for id ${id}`;
        return next(err);
    }

    return res.status(200).json({ item });
  } catch (error) {
   return next(error); 
  }
};

export const updateItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            const err = new Error('Unauthorized') as AppError;
            err.status = 401;
            err.log = 'itemController.updateItem: req.user missing';
            return next(err);
        }
        
        const id = req.params.id as string;
        const { title, url, rawContent, selectedText, userNote } =req.body;

        const existingItem = await prisma.savedItem.findFirst({
            where: {
                id,
                userId: req.user.id,
            },
        });
        if (!existingItem) {
            const err = new Error('Item not found') as AppError;
            err.status = 404;
            err.log = `itemController.updateItem: no item found for id ${id}`;
            return next(err);
        }

        const updatedItem = await prisma.savedItem.update({
            where: { id }, 
            data: {
                ...(title !== undefined && { title }),
                ...(url !== undefined && { url }),
                ...(rawContent !== undefined && { rawContent }),
                ...(selectedText !== undefined && { selectedText }),
                ...(userNote !== undefined && { userNote }),
            },
        });
        return res.status(200).json({ item: updatedItem }); 
    } catch (error) {
        return next(error); 
    }
};

export const deleteItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      const err = new Error('Unauthorized') as AppError;
      err.status = 401;
      err.log = 'itemController.deleteItem: req.user missing';
      return next(err);
    }

    const id = req.params.id as string;

    const existingItem = await prisma.savedItem.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existingItem) {
      const err = new Error('Item not found') as AppError;
      err.status = 404;
      err.log = `itemController.deleteItem: no item found for id ${id}`;
      return next(err);
    }

    await prisma.savedItem.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
