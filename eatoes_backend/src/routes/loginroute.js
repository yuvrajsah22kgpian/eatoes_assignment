// Example: Express.js backend

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/postgresql/User'); // Your user model
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    // Fetch user by email
    const user = await User.findOne({where: {email: email}});
    if (user === null) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isMatch = password === "123456"
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials', type: 'Wrong password' });
    }

    // Generate JWT
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role // Only include minimal, non-sensitive info
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '8h' } // Set appropriate expiry
    );

    res.json({ token, token_type: 'Bearer', uid: user.id });
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;
