const express = require('express');

const MarketController = require('./controllers/MarketController');
const ProductController = require('./controllers/ProductController');
const AuthController = require('./controllers/AuthController');
const ShoppingController = require('./controllers/ShoppingController');

const routes = new express.Router();

// AUTH
routes.post('/markets/authenticate', AuthController.auth);

// MARKET
routes.get('/markets', MarketController.index);
routes.post('/markets/signup', MarketController.store);

// SHOPPING
routes.post('/shopping', ShoppingController.store);
routes.get('/shopping', ShoppingController.index);

// PRODUCT
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

module.exports = routes;