const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student'); // ✅ Add this line
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ CORS
const corsOptions = {
  origin: ["http://localhost:3000", "https://yourdomain.com"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes); // ✅ Register student routes

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

// ✅ Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
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
