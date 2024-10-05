const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('cookie-session');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure sessions
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000,
}));

// MySQL database connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Database_test',
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }
});

// API for uploading product data including images
app.post('/api/sell', upload.array('images', 15), async (req, res) => {
  const { productName, category, price, description, location, phone } = req.body;
  
  // Create file paths for the uploaded images
  const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

  try {
    // Insert product data into MySQL
    const query = `
      INSERT INTO products (product_name, category, price, description, province, district, phone, images) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      
    await db.query(query, [
      productName, 
      category, 
      price, 
      description, 
      JSON.parse(location).province, 
      JSON.parse(location).district, 
      phone, 
      JSON.stringify(imagePaths)  // Store image paths as JSON
    ]);

    res.status(201).json({ message: 'Product uploaded successfully' });
  } catch (err) {
    console.error('Product upload error:', err);
    res.status(500).json({ message: 'Error uploading product' });
  }
});


// Register user
app.post('/register', [
  body('username').isLength({ min: 3 }).trim(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO register (username, email, password) VALUES (?, ?, ?)', 
      [username, email, hash]);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลงทะเบียนผู้ใช้' });
  }
});

// Login user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [results] = await db.query('SELECT * FROM register WHERE username = ?', [username]);

    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      req.session.user = { id: user.id, username: user.username };
      res.json({ message: 'Login successful', user: req.session.user });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
  }
});

// Logout user
app.post('/logout', (req, res) => {
  req.session = null;
  res.json({ message: 'Logged out' });
});




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));