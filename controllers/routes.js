const express = require('express');
const router = express.Router();
const connectDB = require('../db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const { sendMail } = require('../middlewares/all');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// Middleware for error handling
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes
router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to MySite' });
});

// Admin route
router.get('/admin', auth(['read', 'write', 'delete']), (req, res) => {
  res.send('Welcome Admin');
});

// User route
router.get('/user', (req, res) => {
  res.send('Welcome Guest');
});

// User profile route
router.get('/user/profile', auth(['read']), (req, res) => {
  res.send(`Welcome User: ${req.session.user.username}!`);
});

// Set role
router.get('/set-role', (req, res) => {
  const { role } = req.query;

  if (!role) {
    return res.status(400).send('Role parameter is required');
  }

  req.session.user = req.session.user || {};
  req.session.user.role = role;

  res.send('Role set successfully');
});

// Check role
router.get('/check-role', (req, res) => {
  const userRole = req.session.user?.role;

  if (!userRole) {
    return res.status(400).send('Role not set');
  }

  res.send(`Your role is: ${userRole}`);
});

// Register route
router.post(
  '/register',
  [
    body('username').isString().isLength({ min: 5, max: 10 }).withMessage('Username must be at least 5 characters long'),
    body('password').isString().isLength({ min: 8, max: 20 }).withMessage('Password must be at least 8 characters long')
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const { username, password } = req.body;

    const db = await connectDB();
    const usersCollection = db.collection('users');
    const rolesCollection = db.collection('roles');

    const un = `${username}${otp}`;
    const existingUser = await usersCollection.findOne({ username: un });

    if (existingUser) {
      return res.status(409).send('User already exists');
    }

    const role = await rolesCollection.findOne({ name: 'user' });
    if (!role) {
      return res.status(400).send('Invalid role');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = {
      id: uuidv4(),
      username: un,
      email: `${un}@itsmrdry.host`,
      password: hashedPassword,
      date: Date.now(),
      status: 'pending',
      role: { name: role.name, id: role.id },
      otp: { otp, expire: Date.now() }
    };

    await usersCollection.insertOne(user);

    const mailSent = await sendMail({
      template: 'otp.html',
      to: 'mormac82@gmail.com',
      from: `${process.env.APP.toUpperCase()} noreply@itsmrdry.host`,
      subject: `[${process.env.APP.toUpperCase()}] OTP for logging in to your account: ${un}`,
      swap: [['%otp%', otp], ['%year%', new Date().getFullYear()], ['%app%', process.env.APP], ['%username%', un]]
    });

    if (!mailSent) {
      return res.status(500).send('Internal Server Error');
    }

    res.status(201).send('User registered successfully');
  })
);

// Login route
router.post(
  '/login',
  [
    body('username').isString().notEmpty().isLength({ min: 5, max: 10 }).withMessage('Username is required'),
    body('password').isString().notEmpty().isLength({ min: 8, max: 20 }).withMessage('Password is required')
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const db = await connectDB();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send('Invalid credentials');
    }

     // Generate JWT
     const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expiration time
    )


    req.session.user = {
      _id: user._id,
      id: user.id,
      username: user.username,
      role: user.role
    };

    res.status(200).json({ token });
  })
);

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Failed to logout');
    }
    res.clearCookie('connect.sid');
    res.status(200).send('Logout successful');
  });
});

module.exports = router;
