import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.get('/api/test-db', async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});