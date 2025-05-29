const User = require('../models/userModel');
const App = require('../models/appModel');
const Shopify = require('../models/shopifyModel');
const Product = require('../models/productModel');
const jwt = require('jsonwebtoken');
const { createLoginToken, createToken, decodeToken } = require('../utils/jwt')
const { generateClientId, generateClientSecret } = require('../utils/functions')

module.exports.checkToken = (req, res) => {
    const token = req.body.token;

    if (token) {
        jwt.verify(token, 'oi', (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: 'Token is invalid or expired' });
            } else {
                return res.status(200).json({ id: decodedToken.id });
            }
        });
    } else {
        return res.status(400).json({ error: 'Token not provided' });
    }
};

module.exports.checkUser = async (req, res) => {
    const { id } = req.body;

    try {
        const [userResult] = await User.findById(id);

        if (userResult.length > 0) {
            const user = userResult[0];
            return res.status(200).json({ user });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};


module.exports.createApp = async (req, res) => {
    const { type, name, token } = req.body;

    try {
        const decoded = await decodeToken(token)
        const [userResult] = await User.findById(decoded.token);


        if (userResult.length > 0) {

            const clientid = generateClientId();
            const clientsecret = generateClientSecret();

            const app = {
                userid: decoded.token,
                type: type,
                name: name,
                clientid: clientid,
                clientsecret: clientsecret

            }
            const [insertResult] = await App.create(app);
            if (insertResult.affectedRows === 1) {

                return res.status(200).json({ app });

            } else {
                return res.json({ err: "erro durring cration" });

            }


        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};


module.exports.shopifyCredentials = async (req, res) => {

    const { accessTokenShopify, apiKeyShopify, urlShopify, secretKeyShopify, buttonToken, token } = req.body;

    try {
        const decoded = await decodeToken(token)
        const [userResult] = await User.findById(decoded.token);


        if (userResult.length > 0) {



            const shopify = {
                userid: decoded.token,
                accesstokenshopify: accessTokenShopify,
                urlShopify: urlShopify,
                apikeyshopify: apiKeyShopify,
                secretkeyshopify: secretKeyShopify,
                buttontoken: buttonToken
            }
            console.log(shopify)
            const [result] = await Shopify.findByUserId(decoded.token);
            console.log(result)
            console.log(result[0].id)

            let insertResult;
            if (result.length > 0) {
                [insertResult] = await Shopify.update(shopify, result[0].id);
            } else {

                [insertResult] = await Shopify.create(shopify);
            }
            console.log(result.length > 0)

            if (insertResult.affectedRows === 1) {


                return res.status(200).json({ shopify });

            } else {
                return res.json({ err: "erro durring cration" });

            }


        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};


module.exports.saveProduct = async (req, res) => {

    const { productName, productImageUrl, productPrice, ProductQuantity, token } = req.body;

    try {
        const decoded = await decodeToken(token)
        const [userResult] = await User.findById(decoded.token);


        if (userResult.length > 0) {

            const product = {
                name: productName,
                originProductId: 1000, //1000 significa que é um produto foi criado e nao importado de outro site
                price: productPrice,
                quantityOrdered: ProductQuantity,
                orderId: null,
                userid: decoded.token,
                imageUrl: productImageUrl
            };



        
              const  [insertResult] = await  Product.create(product);
            
            

            if (insertResult.affectedRows === 1) {


                return res.status(200).json({ product });

            } else {
                return res.json({ err: "erro durring cration" });

            }


        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};