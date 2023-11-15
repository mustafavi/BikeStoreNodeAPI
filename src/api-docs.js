var path = require('path');
var swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Bike\'s API with Express Js and Node Js',
        version: '0.1.0',
        description:
            'This is a simple CRUD API application made with Express and documented with Swagger',
        license: {
            name: 'MIT',
            url: '',
        },
        contact: {
            name: '',
            url: '',
            email: '',

        },
    },
    servers: [
        {
            url: 'http://localhost:4200/'
        },
    ],
};

var options = {
    definition: swaggerDefinition,
    apis: [
        path.resolve(__dirname, 'api') + '/*.js'
    ]
};

module.exports = options;