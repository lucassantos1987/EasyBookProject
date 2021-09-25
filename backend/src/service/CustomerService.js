
import api from './api';

const CustomerDAO = require('../dao/CustomerDAO');

async function getCustomer(request, response) {
    CustomerDAO.getCustomer(request, response);
}

async function saveCustomer(request, response) {
    var { first_name, last_name, whatsapp, email_address, password, photo } = request.body;

    if (first_name.trim() == '') {

        return response.json({ res: "Digite seu Nome." });

    } else if (last_name.trim() == '') {

        return response.json({ res: "Digite seu Sobrenome." });

    } else if (whatsapp.trim() == '') {

        return response.json({ res: "Digite seu número do WhatsApp." });

    } else if (email_address.trim() == '') {

        return response.json({ res: "Digite seu Email." });

    } else if (password.trim() == '') {

        return response.json({ res: "Digite sua Senha." });

    } else {

        const data = { photo };

        api.post('upload_photo_profile', data)
        .then(function(response) {

            if (response.data.success == true) {

                var v_firstname = first_name;
                var v_lastname = last_name;
                var v_whatsapp = whatsapp;
                var v_emailaddress = email_address;
                var v_password = password;
                var v_photo = response.data.res;

                const data = {
                    v_firstname,
                    v_lastname,
                    v_whatsapp,
                    v_emailaddress,
                    v_password,
                    v_photo
                };

                CustomerDAO.saveCustomer(data, response);
            } else {
                return response.json({ message: "Não foi possível salvar a foto. Tente novamente." });    
            }
        })
        .catch(error => {
            console.log(error.message)
            return response.json({ message: error.message + ". Não foi possível realizar o cadastro. Tente novamente." });
        });
    }
}

async function updateCustomer(request, response) {
    CustomerDAO.updateCustomer(request, response);
}

async function updateCustomerPhoto(request, response) {
    CustomerDAO.updateCustomerPhoto(request, response);
}

module.exports = { getCustomer, saveCustomer, updateCustomer, updateCustomerPhoto }