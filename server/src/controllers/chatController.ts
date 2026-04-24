import { NextFunction, Response } from 'express';
import prisma from '../lib/prisma.js';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { AppError } from '../types/errors.js';
import { generateEmbedding } from '../services/embeddingService.js';
import { cosineSimilarity } from '../utils/similarity.js';
import { formatChatSource } from '../utils/formatters.js';


export const chat = async (req: AuthRequest,res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      const err = new Error('Unauthorized') as AppError;
      err.status = 401;
      err.log = 'chatController.chat: req.user missing';
      return next(err);
    }

    const { query } = req.body;

    if (typeof query !== 'string') {
      const err = new Error('query must be a string') as AppError;
      err.status = 400;
      err.log = 'chatController.chat: query must be a string';
      return next(err);
    }

    if (!query.trim()) {
      const err = new Error('query is required') as AppError;
      err.status = 400;
      err.log = 'chatController.chat: query cannot be empty';
      return next(err);
    }

    const queryEmbedding = await generateEmbedding(query.trim());

    const items = await prisma.savedItem.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        embedding: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    const MIN_SCORE = 0.7;
    const MAX_SOURCES = 3;

    const relevantItems = items
      .filter(
        item =>
          Array.isArray(item.embedding?.vector) &&
          item.embedding.vector.length > 0
      )
      .map(item => {
        const score = cosineSimilarity(queryEmbedding, item.embedding!.vector);
        return formatChatSource(item, score);
      })
      .filter(item => item.score >= MIN_SCORE)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_SOURCES);

    const answer =
      relevantItems.length > 0
        ? `Based on your saved content, I found ${relevantItems.length} relevant item(s) related to "${query.trim()}".`
        : `I could not find any strongly relevant saved items for "${query.trim()}".`;

    return res.status(200).json({
      answer,
      sources: relevantItems,
    });
  } catch (error) {
    return next(error);
  }
};