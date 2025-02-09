/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Modal,
} from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title, 
  Tooltip,
  Legend
);

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const categories = [
    'Food',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills',
    'Other',
  ];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (error) {
      setError('Failed to fetch expenses');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/expenses',
        {
          amount: parseFloat(amount),
          category,
          description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAmount('');
      setCategory('');
      setDescription('');
      fetchExpenses();
    } catch (error) {
      setError('Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchExpenses();
      } catch (error) {
        setError('Failed to delete expense');
      }
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/expenses/${editingExpense._id}`,
        {
          amount: parseFloat(editingExpense.amount),
          category: editingExpense.category,
          description: editingExpense.description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowEditModal(false);
      fetchExpenses();
    } catch (error) {
      setError('Failed to update expense');
    }
  };

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: categories.map((cat) =>
          expenses
            .filter((exp) => exp.category === cat)
            .reduce((sum, exp) => sum + exp.amount, 0)
        ),
        borderColor: 'blue',
        backgroundColor: 'blue',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: { color: 'black' },
        ticks: { color: 'green' },
      },
      y: {
        grid: { color: 'black' },
        ticks: { color: 'red' },
      },
    },
    plugins: {
      legend: { labels: { color: 'blue' } },
    },
  };

  return (
    <Container className="py-4 dashboard-container">
      <Row className="mb-4">
        <Col>
          <h2 className="mb-4">Add New Expense</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={description}
                    placeholder="Enter reason for expense..."
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Expense'}
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2 className="mb-4">Expense Chart</h2>
          <div style={{ height: '400px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </Col>
      </Row>

      <Row >
        <Col >
          <h2 className="mb-4">Recent Expenses</h2>
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id}>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>RS {expense.amount.toFixed(2)}</td>
                  <td className="d-flex gap-3">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-50"
                      onClick={() => handleEdit(expense)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="w-50"
                      onClick={() => handleDelete(expense._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={editingExpense?.amount || ''}
              onChange={(e) =>
                setEditingExpense({ ...editingExpense, amount: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Dashboard;
