const express = require('express');
const router = express.Router();

const productRoutes = require('./product.routes.js');

// router.use((req, res, next) => {
//     console.log('%s %s %s', req.method, req.url, req.path);
//     next();
// });

router.use('/products', productRoutes);


module.exports = router;