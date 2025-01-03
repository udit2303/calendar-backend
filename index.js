const express = require("express");
const cors = require('cors');
const app = express();
const authMiddleware = require("./middleware/authMiddleware");
const auth = require("./routes/auth");
const event = require("./routes/event");
const {loadReminders} = require("./utils/scheduleService");
const db = require('./models');
db.sequelize.sync().then(() => {
    console.log("Database connected and Synced");
})
.catch((err) => {
    console.error('Error syncing database:', err.message);
  });
;
app.use(cors());
app.use(express.json());
app.use("/api/auth", auth);
app.get("/hi", (req, res) => {
    console.log("hello");
    res.send("hi");
});
app.use("/api/events", authMiddleware, event);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
    loadReminders();
});