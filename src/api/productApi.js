 var express = require('express');
 var router = express.Router();
 var productController = require('../controllers/product');
 //var authController = require('../controllers/auth');


router.get('/', productController.getAll);

router.post('/', productController.insert);

router.delete('/:id', productController.delete);

router.put('/',  productController.update);

router.get('/:id', productController.getById);

module.exports = router;