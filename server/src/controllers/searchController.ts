import { NextFunction, Response } from 'express';
import prisma from '../lib/prisma.js';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { AppError } from '../types/errors.js';
import { generateEmbedding } from '../services/embeddingService.js';

const cosineSimilarity = (a: number[], b: number[]): number => {
  if (a.length !== b.length || a.length === 0) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

const formatSearchItem = (item: any, score: number) => ({
  id: item.id,
  title: item.title,
  url: item.url,
  userNote: item.userNote,
  aiSummary: item.aiSummary,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
  tags: item.tags.map((itemTag: any) => itemTag.tag.name),
  score,
});

export const semanticSearch = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        if (!req.user) {
            const err = new Error('Unauthorized') as AppError;
            err.status = 401;
            err.log = 'searchController.semanticSearch: req.user missing';
            return next(err);
        }

        const { query } = req.body;

        if (typeof query !== 'string') {
            const err = new Error('query must be a string') as AppError;
            err.status = 400;
            err.log = 'searchController.semanticSearch: query must be a string';
            return next(err);
        }

        if (!query.trim()) {
            const err = new Error('query is required') as AppError;
            err.status = 400;
            err.log = 'searchController.semanticSearch: query cannot be empty';
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

        const scoredResults = items
            .filter(item => Array.isArray(item.embedding?.vector) && item.embedding.vector.length > 0)
            .map(item => {
                const score = cosineSimilarity(queryEmbedding, item.embedding!.vector);
                return formatSearchItem(item, score);
            })
            .filter(item => item.score >= MIN_SCORE)
            .sort((a, b) => b.score - a.score);

        return res.status(200).json({ results: scoredResults });

    } catch (error) {
        return next(error);
    }
};
