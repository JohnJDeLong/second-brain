import { Router } from 'express';
import { createItem, getItems } from '../controllers/itemController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/',requireAuth, createItem);
router.get('/',requireAuth, getItems); 

export default router;