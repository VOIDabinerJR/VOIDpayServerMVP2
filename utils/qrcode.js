const express = require('express');
const bodyParser = require('body-parser');

const QRCode = require('qrcode');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const consumerKey = ''; // Your M-Pesa consumer key
const consumerSecret = ''; // Your M-Pesa consumer secret

// Function to get an access token from Safaricom
async function getAccessToken() {
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
}

// Function to generate QR code
async function generateQRCode(amount, refNo) {
    const token = await getAccessToken();
    const url = 'https://sandbox.safaricom.co.ke/mpesa/qrcode/v1/generate';

    const payload = {
        Amount: amount,
        RefNo: refNo,
        TrxCode: 'PB',
        CPI: 174379,
        MerchantName: 'Daraja Sandbox',
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        return data.QRCode;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
}

app.post('/generate-qr', async (req, res) => {
    const { amount, refNo } = req.body;

    try {
        const qrCodeData = await generateQRCode(amount, refNo);
        res.json({ qrCode: qrCodeData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
