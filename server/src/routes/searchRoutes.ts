import { Router } from 'express';
import { semanticSearch } from '../controllers/searchController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/semantic', requireAuth, semanticSearch);

export default router; 