import { Router } from 'express';
import { chat } from '../controllers/chatController.js';
import { requireAuth } from '../middleware/authMiddleware.js';


const router = Router(); 

router.post('/', requireAuth, chat); 

export default router; 