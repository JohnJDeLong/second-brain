import { NextFunction, Response } from 'express';
import prisma from '../lib/prisma.js';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { AppError } from '../types/errors.js';
import { generateEmbedding } from '../services/embeddingService.js';
import { cosineSimilarity } from '../utils/similarity.js';
import { formatSearchResult } from '../utils/formatters.js';

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
                return formatSearchResult(item, score);
            })
            .filter(item => item.score >= MIN_SCORE)
            .sort((a, b) => b.score - a.score);

        return res.status(200).json({ results: scoredResults });

    } catch (error) {
        return next(error);
    }
};
