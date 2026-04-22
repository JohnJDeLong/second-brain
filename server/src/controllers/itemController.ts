import { NextFunction, Response } from 'express';
import prisma from '../lib/prisma.js';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { AppError } from '../types/errors.js';

export const createItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            const err = new Error('Unauthorized') as AppError;
            err.status = 401;
            err.log = 'itemController.createItem: req.user missing';
            return next(err);
        }

        const { title, url, rawContent, selectedText, userNote } = req.body;

        if (
            typeof title !== 'string' || 
            typeof url !== 'string' ||
            typeof rawContent !== 'string'
        ) {
            const err = new Error('title, url, and rawContent must be strings') as AppError;
            err.status = 400;
            err.log = 'itemController.createItem: required fields must be strings';
            return next(err); 
        }

        if(!title.trim() || !url.trim() || !rawContent.trim()) {
            const err = new Error('title, url and rawContent are required') as AppError; 
            err.status = 400;
            err.log = 'itmeController.createItem: required fields cannot be empty'; 
            return next(err); 
        }

        if (selectedText !== undefined && typeof selectedText !== 'string') {
            const err = new Error('selectedText must be a string') as AppError; 
            err.status = 400; 
            err.log = 'itemController.createItem: required fields cannot be empty'; 
            return next(err); 
        }

        if (userNote !== undefined && typeof userNote !== 'string') {
            const err = new Error('userNote must be a string') as AppError; 
            err.status = 400; 
            err.log = 'itemController.create item: selectedText must be a string' ;
            return next(err); 
        }

        const item = await prisma.savedItem.create({
            data: {
                userId: req.user.id, 
                title: title.trim(),
                url: url.trim(),
                rawContent: rawContent.trim(), 
                selectedText, 
                userNote,
            },
        });
        
        return res.status(201).json({ item }); 

    } catch (error) {
        return next(error);
    }

};

export const getItems = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            const err = new Error('Unauthorized') as AppError;
            err.status = 401;
            err.log = 'itemController.getItems: req.user missing';
            return next(err);
        }

        const items = await prisma.savedItem.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
        });

        return res.status(200).json({ items }); 

    } catch (error) {
        return next(error); 
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
    const { userNote } = req.body;

    if (userNote !== undefined && typeof userNote !== 'string') {
      const err = new Error('userNote must be a string') as AppError;
      err.status = 400;
      err.log = 'itemController.updateItem: userNote must be a string';
      return next(err);
    }
    if (userNote === undefined) {
        const err = new Error('userNote is required') as AppError;
        err.status = 400;
        err.log = 'itemController.updateItem: no editable fields provided';
        return next(err);
    }

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
