import express from 'express';
import Expense from '../models/Expense.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

// Get all expenses for the logged-in user
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId })
      .sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});

// Add new expense
router.post('/', async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const expense = await Expense.create({
      user: req.userId,
      amount,
      category,
      description
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense' });
  }
});

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.userId });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    await expense.deleteOne();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense' });
  }
});

// Update expense
router.put('/:id', async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const expense = await Expense.findOne({ _id: req.params.id, user: req.userId });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.amount = amount;
    expense.category = category;
    expense.description = description;
    
    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense' });
  }
});

export default router;