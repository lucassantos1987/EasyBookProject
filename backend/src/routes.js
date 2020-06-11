const express = require('express');

const routes = express.Router();

routes.post('/category', (request, response) => {

    const body = request.body;

    console.log(body);

    return response.json({
        description: 'Eletricista'
    });
});

module.exports = routes;