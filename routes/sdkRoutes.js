const express = require('express');
const router = express.Router();
const path = require('path');
const payController = require('../controllers/sdkController');


router.get('/js', (req, res) => {
    const acept = req.query.acept; // Use req.query para parâmetros de consulta
    const clientId = req.query.clientId; 
    console.log(acept)

    if (acept === 'true') { 
        res.sendFile(path.join(__dirname, '../', '/sdk/payment.js'));
      
    } else {
        res.sendFile(path.join(__dirname, '../', '/sdk/OrderButton.js'));
    }
});

router.get('/jsc', (req, res) => {
    const acept = req.query.acept;
    const clientId = req.query.clientId; 
    if (acept === 'true') { 
       
    } else {
       
    }
});

 


router.get('/test', (req, res) => {
    const orderData = {
        orderItems: [
            {
                name: "Cadeira Gamer",
                price: 1200.00,
                quantity: 2,
                img: "https://example.com/images/cadeira_gamer_betala.jpg",
                imgAlt: "Imagem de uma cadeira "
            }
        ],
        subtotal: 2400.00,
        ivaTax: 20,
        iva: 480.00,
        shippingCost: "GRATUITA",
        totalAmount: 28987654380.00
    };
    res.render('index',{orderData:orderData, queryy:''})

});

router.get('/try', (req, res) => {




    res.sendFile(path.join(__dirname, '../', 'aa.html'));
    console.log()

    //res.render('pay',{ productId:1, quantity:1, description:1, totalAmount:1})
});
router.get('/views/formulario/styles.css', (req, res) => {




    res.sendFile(path.join(__dirname, '../views/formulario/styles.css'));


});


module.exports = router;
