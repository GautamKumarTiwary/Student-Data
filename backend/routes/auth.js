const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Gautamisagoodboy";

// ✅ Route 1: Test Route - GET "/api/auth"
router.get("/", (req, res) => {
  res.json({ message: "🚀 API is working!" });
});

// ✅ Route 2: Create User - POST "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "Name should be at least 3 characters").isLength({ min: 3 }),
    body("email", "Invalid email").isEmail(),
    body("password", "Password should be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Validate fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      // 🔍 Check if user exists
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "User with this email already exists!",
        });
      }

      // 🔐 Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 👤 Create new user
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      // 🪪 Generate JWT token
      const payload = { user: { id: user.id } };
      const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.json({ success: true, authtoken });
    } catch (err) {
      console.error("❌ Error:", err.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

// ✅ Route 3: Login User - POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          error: "Invalid email or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          error: "Invalid email or password",
        });
      }

      const payload = { user: { id: user.id } };
      const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.json({ success: true, authtoken });
    } catch (err) {
      console.error("❌ Error:", err.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

// ✅ Route 4: Get Logged In User Details - POST "/api/auth/getuser"
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
