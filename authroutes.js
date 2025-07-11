const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

// Dummy user
const user = { id: 1, name: 'Test User', email: 'test@example.com' };

// Signup route
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  // In real apps, you’d save to DB
  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', (req, res) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route
router.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Access granted', user: decoded });
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

module.exports = router;
