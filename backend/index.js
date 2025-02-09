import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
  })
);

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});       