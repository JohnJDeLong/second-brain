import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma.js';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

console.log('index.ts is running');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


//http://localhost:3000/api/health
app.get('/api/health', (_req, res) => {
  res.status(200).json({ message: 'Server is running' }); 
});

//console.log('hit this line of code ')
//http://localhost:3000/api/test-db
// app.get('/api/test-db', (_req, res) => {
//   console.log('HANDLER: /api/test-db');
//   res.json({ users: [] });
// });
app.get('/api/test-db', async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});



app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes); 

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


