const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // ✅ Import fs to check if file exists

const app = express();

// ✅ CORS
const corsOptions = {
  origin: ["http://localhost:3000", "https://yourdomain.com"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors({
  origin: "https://student-data-eosin.vercel.app", // allow your frontend domain
  methods: ["GET", "POST"],
  credentials: true // if you're sending cookies
}));
// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);

// ✅ Log registered routes
const listRoutes = (app) => {
  console.log("✅ Registered Routes:");
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(`➡️ ${Object.keys(middleware.route.methods).join(", ").toUpperCase()} ${middleware.route.path}`);
    }
  });
};
listRoutes(app);

// ✅ Serve static files in production (only if file exists)
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

// ✅ Start server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

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
