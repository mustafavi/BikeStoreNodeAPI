var sql = require('mssql');

var config = {
    server: process.env.SERVER,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: +process.env.DB_PORT,
    options: {
        encrypt: false
    }
};

module.exports = {

    executeDelete: function (query) {
        return new Promise(function (resolve, reject) {
            sql.connect(config).then( function (pool) {
                return pool.request().query(query);
            }).then(function (result) {
                sql.close();
                resolve('success');
            }).catch(function (err) {
                sql.close();
                reject(err);
            });
        });
    },

    ExecuteSelectQuery: function (query) {
        return new Promise(async function (resolve, reject) {
            await sql.connect(config).then(function (pool) {
                return  pool.request().query(query);
            }).then(function (result) {
                //sql.close();
                resolve(result.recordset);
            }).catch( async function (err) {
                //sql.close();
              await  reject(err);
            });
        });
    },

    insertOrUpdate: function (query) {
        return new Promise(function (resolve, reject) {
            sql.connect(config).then(function (pool) {
                return pool.request().query(query);
            }).then(function (result) {
                sql.close();
                resolve('success');
            }).catch(function (err) {
                sql.close();
                reject(err);
            });
        });
    },

    getDataSet: function (query) {
        return new Promise(function (resolve, reject) {
            sql.connect(config).then(function (pool) {
                return pool.request().query(query);
            }).then(function (result) {
                sql.close();
                resolve(result.recordset);
            }).catch(function (err) {
                sql.close();
                reject(err);
            });
        });
    }
};