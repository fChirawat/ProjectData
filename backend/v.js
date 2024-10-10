const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('cookie-session');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

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

// Check if uploads folder exists; if not, create it
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log('Uploads folder created.');
}

// Serve static files from uploads folder
app.use('/uploads', express.static(uploadDir));

// MySQL database connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Database_test',
});

// Create products table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    category ENUM('หมวก', 'เสื้อ', 'กางเกง', 'รองเท้า', 'สร้อยคอ', 'แหวน', 'กำไลข้อมือ', 'ต่างหู') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    product_image VARCHAR(255) NOT NULL,
    product_description TEXT,
    product_location VARCHAR(255),
    phone_number VARCHAR(20)
);
`;

// Use async/await to create the table
(async () => {
  try {
    await db.query(createTableQuery);
    console.log('Products table created or already exists.');
  } catch (err) {
    console.error('Error creating products table:', err);
    process.exit(1);
  }
})();

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

// API for uploading product data including images (multiple images)
app.post('/api/sell', upload.array('images', 15), async (req, res) => {
  const { product_name, category, price, product_description, product_location, phone_number } = req.body;
  
  // Create file paths for the uploaded images
  const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

  try {
    // Insert product data into MySQL
    const query = `
      INSERT INTO products (product_name, category, price, product_description, product_location, phone_number, product_image) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
      
    await db.query(query, [
      product_name, 
      category, 
      price, 
      product_description, 
      product_location, 
      phone_number, 
      imagePaths[0]  // Store only the first image
    ]);

    res.status(201).json({ message: 'Product uploaded successfully' });
  } catch (err) {
    console.error('Product upload error:', err);
    res.status(500).json({ message: 'Error uploading product' });
  }
});

// Fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM products');
    res.json(results);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products. Please try again later.' });
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


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


