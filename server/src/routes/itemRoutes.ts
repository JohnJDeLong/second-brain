import { Router } from 'express';
import { createItem, getItems, getItemById } from '../controllers/itemController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/',requireAuth, createItem);
router.get('/',requireAuth, getItems); 
router.get('/:id', requireAuth, getItemById); 

export default router;