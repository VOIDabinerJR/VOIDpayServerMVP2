const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Importing routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const buttonRoutes = require('./routes/buttonRoutes');
const orderRoutes = require('./routes/orderRoutes');
const payRoutes = require('./routes/payRoutes');

// Using routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/button', buttonRoutes);
app.use('/order', orderRoutes);


app.use('/pay', payRoutes);

// Rota para servir um arquivo HTML estático
app.get('/a', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
