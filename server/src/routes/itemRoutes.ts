import { Router } from 'express';
import { createItem, getItems, getItemById, updateItem, deleteItem, } from '../controllers/itemController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/',requireAuth, createItem);
router.get('/',requireAuth, getItems); 
router.get('/:id', requireAuth, getItemById); 
router.patch('/:id', requireAuth, updateItem); 
router.delete('/:id', requireAuth, deleteItem); 

export default router;