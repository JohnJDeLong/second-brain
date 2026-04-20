import { Router } from 'express';
import { createItem } from '../controllers/itemController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/',requireAuth, createItem);

export default router;