// routes/tickets.js

const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected...");
});

// Проверка QR-кода
router.post("/check_qr", (req, res) => {
    const { qr_hash } = req.body;

    db.query("SELECT * FROM tickets WHERE qr_hash = ?", [qr_hash], (err, results) => {
        if (err) return res.status(500).send("Error on the server.");
        if (results.length === 0) return res.status(404).send("QR code not found.");

        const ticket = results[0];
        if (ticket.is_active) {
            db.query("UPDATE tickets SET is_active = 0 WHERE qr_hash = ?", [qr_hash], (updateErr) => {
                if (updateErr) return res.status(500).send("Error updating the ticket.");
                res.status(200).send({ status: "success", message: "QR code is valid and now deactivated." });
            });
        } else {
            res.status(400).send({ status: "fail", message: "QR code is already deactivated." });
        }
    });
});

module.exports = router;
