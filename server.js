const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const authRoutes = require("./routes/auth");
const ticketsRoutes = require("./routes/tickets");

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
