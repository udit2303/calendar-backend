const express = require("express");
const cors = require('cors');
const app = express();
const authMiddleware = require("./middleware/authMiddleware");
const auth = require("./routes/auth");
const event = require("./routes/event");
const corsOptions = {
    origin: 'http://localhost:3001', // Allow requests from the frontend (localhost:3001)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  };
  
  // Enable CORS for all routes with the configured options
  app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", auth);
app.get("/hi", (req, res) => {
    console.log("hello");
    res.send("hi");
});
app.use("/api/events", authMiddleware, event);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});