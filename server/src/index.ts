import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import searchRoutes from './routes/searchRoutes.js';


console.log('index.ts is running');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



app.get('/api/health', (_req, res) => {
  res.status(200).json({ message: 'Server is running' }); 
});





app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes); 
app.use('/api/search', searchRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


