const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка CORS
const corsOptions = {
    origin: '*', // Разрешить все источники (для тестирования)
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const authRoutes = require("./routes/auth");
const ticketsRoutes = require("./routes/tickets");

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
