var db = require('./db');

var GetAll = function (req, res) {
    //var query = `SELECT [category_id] ,[category_name] FROM [BikeStores].[production].[categories] where category_name like 'c%'`;
    var query = `SELECT [category_id], [category_name] FROM [BikeStores].[production].[categories]`;
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
    console.log('something  ',obj);

    var query = 'INSERT INTO [BikeStores].[production].[categories](category_name)';
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
    var query = `UPDATE [BikeStores].[production].[categories] SET category_name = '${obj.category_name}' where category_id = ${obj.Id} `;
    db.insertOrUpdate(query)
        .then(function (data) {
            res.status(200).send('record updated successfully');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

var Delete = function (req, res) {
    var query = 'DELETE FROM [BikeStores].[production].[categories] WHERE category_id = ' + req.params.id;
    db.executeDelete(query)
        .then(function (data) {
            res.status(200).send('record deleted successfully');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

var GetById = function (req, res) {
    var query = 'SELECT * FROM [BikeStores].[production].[categories] WHERE category_id = ' + req.params.id;
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
