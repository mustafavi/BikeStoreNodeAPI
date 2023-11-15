var db = require('./db');

var GetAll = function (req, res) {
var query = `SELECT [product_id]
,[product_name]
,[brand_id]
,[category_id]
,[model_year]
,[list_price]
FROM [BikeStores].[production].[products]`;

    db.ExecuteSelectQuery(query)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};



var Insert = function (req, res) {
    var obj = req.body;
    var query = `INSERT INTO  [BikeStores].[production].[products](product_name, brand_id, category_id, model_year, list_price)`;
    query += `values ('${obj.categoryName}')`;
    db.ExecuteSelectQuery(query)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

var Update = function (req, res) {
    var obj = req.body;
    var query = `UPDATE [BikeStores].[production].[products] SET
    product_name = ${obj.product_name},
    brand_id = ${obj.brand_id},
    category_id = ${obj.category_id},
    model_year = ${obj.model_year},
    list_price = ${obj.list_price}
    where product_id = ${obj.product_id}
    `;
    db.insertOrUpdate(query)
        .then(function (data) {
            res.status(200).send('record updated successfully');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

var Delete = function (req, res) {
    var query = 'DELETE FROM [BikeStores].[production].[products] WHERE product_id = ' + req.params.id;
    db.executeDelete(query)
        .then(function (data) {
            res.status(200).send('record deleted successfully');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

var GetById = function (req, res) {
    var query = 'SELECT * FROM [BikeStores].[production].[products] WHERE product_id = ' + req.params.id;
    db.ExecuteSelectQuery(query)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

module.exports = {
    insert: Insert,
    update: Update,
    delete: Delete,
    getById: GetById,
    getAll: GetAll
};
