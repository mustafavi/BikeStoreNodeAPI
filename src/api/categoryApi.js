var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/category');
 var authController = require('../controllers/auth');

/**
 * @swagger
 * tags:
 * name: Category
 * /Category:
 *   get:
 *     summary: Retrieves a list of Categories
 *     description: Retrieve a list of Bike Categories.
 *      Can be used to populate a list of Bike Categories when prototyping or testing an API.
*/
router.get('/', categoryController.getAll);


router.post('/', categoryController.insert);


router.delete('/:id', authController.authenticate, categoryController.delete);


router.put('/', authController.authenticate, categoryController.update);

router.get('/:id', authController.authenticate, categoryController.getById);

module.exports = router;