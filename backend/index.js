const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// ✅ Proper CORS setup
const corsOptions = {
  origin: ["https://student-data-eosin.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);

// ✅ CORS Test Route
app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working properly 🎉' });
});

// ✅ Log Registered Routes
const listRoutes = (app) => {
  console.log("✅ Registered Routes:");
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(`➡️ ${Object.keys(middleware.route.methods).join(", ").toUpperCase()} ${middleware.route.path}`);
    }
  });
};
listRoutes(app);

// ✅ Serve static files in production (if available)
if (process.env.NODE_ENV === 'production') {
  const publicDir = path.join(__dirname, 'public');
  const indexPath = path.join(publicDir, 'index.html');

  if (fs.existsSync(indexPath)) {
    app.use(express.static(publicDir));

    app.get('*', (req, res) => {
      res.sendFile(indexPath);
    });
  } else {
    console.warn('⚠️ index.html not found in public folder. Skipping static file serving.');
  }
}

// ✅ Start Server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // ✅ Catch unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error(`❌ Unhandled Rejection: ${err.message}`);
      server.close(() => process.exit(1));
    });

  } catch (err) {
    console.error(`❌ DB connection failed: ${err.message}`);
    process.exit(1);
  }
};

startServer();
