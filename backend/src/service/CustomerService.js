const CustomerDAO = require('../dao/CustomerDAO');

async function getCustomer(request, response) {
    CustomerDAO.getCustomer(request, response);
}

async function saveCustomer(request, response) {
    const { first_name, last_name, whatsapp, photo, emailAddress, password } = request.body;

    if (first_name.trim() == '') {

        return response.json({ res: "Digite seu Nome." });

    } else if (last_name.trim() == '') {

        return response.json({ res: "Digite seu Sobrenome." });

    } else if (whatsapp.trim() == '') {

        return response.json({ res: "Digite seu número do WhatsApp." });

    } else if (photo.trim() == '') {

        return response.json({ res: "Selecione sua Foto." });

    } else if (emailAddress.trim() == '') {

        return response.json({ res: "Digite seu Email." });

    } else if (password.trim() == '') {

        return response.json({ res: "Digite sua Senha." });

    } else {
        CustomerDAO.saveCustomer(request, response);
    }

    return;
    
}

async function updateCustomer(request, response) {
    CustomerDAO.updateCustomer(request, response);
}

async function updateCustomerPhoto(request, response) {
    CustomerDAO.updateCustomerPhoto(request, response);
}

module.exports = { getCustomer, saveCustomer, updateCustomer, updateCustomerPhoto }