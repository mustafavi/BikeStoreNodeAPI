var express = require('express');
var router = express.Router();
var brandController = require('../controllers/brand');
 var authController = require('../controllers/auth');


router.get('/', brandController.getAll);


router.post('/', brandController.insert);


router.delete('/:id', brandController.delete);


router.put('/', brandController.update);

router.get('/:id', brandController.getById);

module.exports = router;