const axios = require('axios');
const CustomerDAO = require('../dao/CustomerDAO');
const SendEmailService = require('./SendEmailService');

async function getCustomer(request, response) {
    CustomerDAO.getCustomer(request, response);
}

async function saveCustomer(request, response) {
    var { first_name, last_name, whatsapp, email_address, password, photo } = request.body;

    if (first_name.trim() == '') {

        return response.json({ message: "Digite seu Nome." });

    } else if (last_name.trim() == '') {

        return response.json({ message: "Digite seu Sobrenome." });

    } else if (whatsapp.trim() == '') {

        return response.json({ message: "Digite seu número do WhatsApp." });

    } else if (email_address.trim() == '') {

        return response.json({ message: "Digite seu Email." });

    } else if (password.trim() == '') {

        return response.json({ message: "Digite sua Senha." });

    } else if (photo.trim() == '') {

        return response.json({ message: "Selecione sua Foto agora. "});

    } else {
        CustomerDAO.saveCustomer(request, response);
    }
}

async function updateCustomer(request, response) {
    CustomerDAO.updateCustomer(request, response);
}

async function updateCustomerPhoto(request, response) {
    CustomerDAO.updateCustomerPhoto(request, response);
}

module.exports = { getCustomer, saveCustomer, updateCustomer, updateCustomerPhoto }