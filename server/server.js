const express = require('express');
const session = require('express-session')
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.get('/api/sizes', (req, res) => {
    const query = `SELECT * FROM size`;
    db.query(query, (err, results) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.json(results);
        }
    })
})

app.listen(5000, () => {
    console.log('App listening on port 5000...')
})