const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');


const { createToken } = require('./utils/jwt');
const { shortID2 } = require('./utils/functions');
const { sendRecoverEmail } = require('./utils/email');

require('dotenv').config({ path: './.env' });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/formulario'));




// Importing routes 
const authRoutes = require('./routes/authRoutes');
const pagesRoutes = require('./routes/pagesRoutes');
const userRoutes = require('./routes/userRoutes');
const buttonRoutes = require('./routes/buttonRoutes');
const orderRoutes = require('./routes/orderRoutes');
const payRoutes = require('./routes/payRoutes');
const sdkRoutes = require('./routes/sdkRoutes');

// Using routes
app.use('/auth', authRoutes);
app.use('/pages', pagesRoutes);
app.use('/user', userRoutes);
app.use('/button', buttonRoutes);
app.use('/order', orderRoutes);
app.use('/pay', payRoutes);
app.use('/sdk', sdkRoutes);

// Rota para servir um arquivo HTML estático
app.get('/a', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/////////////
app.post('/wallets', async (req, res) => {
    try {
        const { userId, appId, balance } = req.body;
        const newWallet = { userId, appId, balance };
        const result = await Wallet.create(newWallet);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//////////////////////



app.post('/paymentResponse', (req, res) => {
    const requestData = req.body;
    requestData.clientSecret = 'SEU-CLIENT-SECRET'
    console.log('Webhook')

    console.log('Response Api User:', requestData);
    fetch('http://localhost:3000/pay/aprove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then(response => response.json())
        .then(responseData => {
            console.log('payment details', responseData);


        })
        .catch(error => {
            console.error('Error making fetch request:', error);

        });
});


app.post('/recovery', async (req, res) => {
    const requestData = req.body;
    console.log(requestData)
    const data = {
        email: requestData.email,
        user: requestData.user,

    };
    console.log(data)

    fetch("https://voidpayservermvp2.onrender.com/recover", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            console.log("Success:", result);
        })
        .catch(error => {
            console.error("Error:", error);
        });



    // const token = createToken(requestData.user.id); 
    //const token2 =shortID2(requestData.user.id)
    //console.log(token2)

    // const sent = await sendRecoverEmail(requestData.email, token);

    //if (!sent.status) {
    //     return res.status(404).json({ error: "verification email not sent" })
    // }
    return res.status(200).json({ sucess: true, message: "sucesso" });
});
app.post('/recover', async (req, res) => {
    const requestData = req.body;
    console.log(requestData)

    const token = createToken(requestData.user.id);
    //const token2 =shortID2(requestData.user.id)
    //console.log(token2)

    const sent = await sendRecoverEmail(requestData.email, token);

    if (!sent.status) {
        return res.status(404).json({ error: "verification email not sent" })
    }
    return res.status(200).json({ sucess: true, message: "sucesso" });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
