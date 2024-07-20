const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3200','http://localhost:9000', '*' ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Importing routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const buttonRoutes = require('./routes/buttonRoutes');
const orderRoutes = require('./routes/orderRoutes');
const payRoutes = require('./routes/payRoutes');
const sdkRoutes = require('./routes/sdkRoutes');

// Using routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/button', buttonRoutes);
app.use('/order', orderRoutes);
app.use('/pay', payRoutes);
app.use('/sdk', sdkRoutes);

// Rota para servir um arquivo HTML estático
app.get('/a', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
