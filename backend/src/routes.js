const express = require('express');
const connection = require('./database/connection');
const routes = express.Router();

routes.get('/category', async(request, response) => {
    const category = await connection('category').select('*');

    return response.json(category);
});

routes.post('/category', async(request, response) => {
    const { name } = request.body;

    await connection('category').insert({
        name,
    });

    return response.json();
});

module.exports = routes;