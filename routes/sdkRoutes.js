const express = require('express');
const router = express.Router();
const path = require('path');
const payController = require('../controllers/sdkController');


router.get('/getbutton', (req, res) => {
    const acept = req.query.acept; // Use req.query para parâmetros de consulta

    if (acept === 'true') { // Verifique se o parâmetro 'acept' é igual a 'true'
        res.sendFile(path.join(__dirname, '../', 'payment.js'));
       // res.sendFile(path.join(__dirname, '../', 'sdk.js')); // Envia o arquivo js
    } else {
        res.sendFile(path.join(__dirname, '../', 'OrderButton.js'));
    }
});


router.get('/pay', (req, res) => { 
    const maxAge = 3 * 24 * 60 * 60 * 1000; 
    
    
    res.cookie('orderid', '13', { httpOnly: true, maxAge });
    res.sendFile(path.join(__dirname, '../', 'page.html'));
   
    //res.render('pay',{ productId:1, quantity:1, description:1, totalAmount:1})
});

router.get('/test', (req, res) => { 
    
    
    
   
    res.sendFile(path.join(__dirname, '../', 'views/formulario/index.html'));
    console.log()
  
    //res.render('pay',{ productId:1, quantity:1, description:1, totalAmount:1})
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
