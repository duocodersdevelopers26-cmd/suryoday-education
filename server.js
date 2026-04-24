const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// ── MIDDLEWARE ──
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json({ limit: '10kb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// ── MONGODB CONNECTION ──
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/suryoday', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// ── INQUIRY SCHEMA ──
const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name too long'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    match: [/^[6-9]\d{9}$/, 'Enter a valid Indian phone number'],
  },
  standard: {
    type: String,
    required: [true, 'Standard is required'],
    enum: [
      'Standard 1','Standard 2','Standard 3','Standard 4','Standard 5',
      'Standard 6','Standard 7','Standard 8','Standard 9','Standard 10',
      'Standard 11 – Commerce','Standard 12 – Commerce'
    ],
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message too long'],
  },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['new','contacted','enrolled'], default: 'new' },
});

// Sanitize phone before saving
inquirySchema.pre('save', function(next) {
  this.phone = this.phone.replace(/\D/g, '');
  next();
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// ── ROUTES ──

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Suryoday Education API running 🌟' });
});

// Submit inquiry
app.post('/api/inquiry', async (req, res) => {
  try {
    const { name, phone, standard, message } = req.body;

    // Server-side validation
    if (!name || !phone || !standard) {
      return res.status(400).json({ error: 'Name, phone, and standard are required.' });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({ error: 'Enter a valid 10-digit Indian phone number.' });
    }

    const inquiry = new Inquiry({ name, phone: cleanPhone, standard, message });
    await inquiry.save();

    console.log(`📩 New inquiry from ${name} (${cleanPhone}) - ${standard}`);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully! We will contact you within 24 hours.',
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    console.error('Submit error:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Get all inquiries (admin endpoint – protect with auth in production)
app.get('/api/inquiries', async (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ total: inquiries.length, inquiries });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// ── START SERVER ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Suryoday Education server running on port ${PORT}`);
});
