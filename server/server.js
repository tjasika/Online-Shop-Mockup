const express = require('express');
const session = require('express-session')
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors({
  origin: "http://localhost:5173",   
  credentials: true                
}));

app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}))

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

//test route
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


//GET Routes
app.get('/api/products', (req, res) => {
    const query = `
        SELECT 
            p.Id as id,
            p.Name as name, 
            p.Description as description,
            p.Price as price, 
            p.Primary_img_url as image,
            p.Secondary_img1_url as image2,
            p.Secondary_img2_url as image3,
            c.Name as category
        FROM Product p
        JOIN Category c ON p.Category_Id = c.Id`;
    db.query(query, (err, results) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.json(results);
        }
    })
})

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = `
        SELECT 
            p.Id as id,
            p.Name as name, 
            p.Description as description,
            p.Price as price, 
            p.Primary_img_url as image,
            p.Secondary_img1_url as image1,
            p.Secondary_img2_url as image2,
            c.Name as category
        FROM Product p
        JOIN Category c ON p.Category_Id = c.Id
        WHERE p.Id = ?
    `;
    
    db.query(query, [productId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Product not found.' });
        } else {
            res.json(results[0]);
        }
    });
});

app.get('/api/products/:id/sizes', (req, res) => {
    const productId = req.params.id;
    const query = `
        SELECT s.Id, s.Name 
        FROM Size s
        JOIN Product_has_size phs ON s.Id = phs.size_id
        WHERE phs.product_id = ?
        `
    db.query(query, [productId], (err, results) => {
        if(err) {
            res.status(500).json({error: err})
        } else if (results.length === 0) {
            res.status(404).json({message: "Sizes not found"});
        } else {
            res.json(results);
        }
    })
});

app.get('/api/products/:id/colors', (req, res) => {
    const productId = req.params.id;
    const query = `
        SELECT c.Id, c.Name 
        FROM Color c
        JOIN Product_has_color phc ON c.Id = phc.color_id  
        WHERE phc.product_id = ?
    `;
    db.query(query, [productId], (err, results) => {
        if(err) {
            res.status(500).json({error: err})
        } else if (results.length === 0) {
            res.status(404).json({message: "Colors not found"});
        } else {
            res.json(results);
        }
    })
})

app.get('/api/categories', (req, res) => {
    const query = `SELECT Name FROM Category`;
     db.query(query, (err, results) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.json(results);
        }
    })
})

app.get('/api/check-session', (req, res) => {
    if(req.session.userId) {
        const query = `SELECT Id, First_name, Last_name, Email FROM Customer WHERE Id = ?`;
        db.query(query, [req.session.userId], (err, results) => {
            if(err || results.length === 0) {
                return res.status(401).json({ isLoggedIn: false });
            }
            const user = results[0];
            res.json({ 
                isLoggedIn: true,
                user: {
                    id: user.Id,
                    firstName: user.First_name,
                    lastName: user.Last_name,
                    email: user.Email
                }
            });
        })
    } else {
        res.json({ isLoggedIn: false });
    }
})

//POST Routes
app.post('/api/signup', async (req, res) => {
    try {
        const {firstName, lastName, email, password } = req.body;
        const checkQuery = `SELECT * FROM Customer WHERE Email = ?`;
        const insertQuery = `INSERT INTO Customer (First_name, Last_name, Email, Password) VALUES (?, ?, ?, ?)`
        db.query(checkQuery, [email], async (err, results) => {
            if(err) {
                return res.status(500).json({error: "Database error."})
            }
            if(results.length > 0) {
                return res.status(400).json({message: "User with this email already exists."});
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            db.query(insertQuery, [firstName, lastName, email, hashedPassword], async (err, results) => {
                if(err) {
                    return res.status(500).json({error: "Database error."});
                }
                res.status(201).json({ message: 'User created successfully' });
            });
        })

    } catch(error) {
        console.error("Error:", error);
    }
})

app.post('/api/login', (req, res) => {
    try {
        const {email, password} = req.body;
        const query = (`SELECT * FROM Customer WHERE Email = ?`);
        db.query(query, [email], async (err, results) => {
            if(err) {
                return res.status(500).json({error: "Database error."});
            }
            if(results.length === 0) {
                return res.status(401).json({message: "Invalid email or password."});
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.Password);
            if(!isMatch) {
                return res.status(401).json({message: "Invalid email or password."});
            }

            req.session.userId = user.Id;
            req.session.userEmail = user.Email;
            

            res.json({ 
                message: 'Login successful',
                user: {
                    id: user.Id,
                    firstName: user.First_name,
                    lastName: user.Last_name,
                    email: user.Email
                }
            });
        })
    } catch(error) {
         console.error("Error:", error);
         res.status(500).json({ error: 'Server error' });
    }
})

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
})

app.listen(5000, () => {
    console.log('App listening on port 5000...')
})