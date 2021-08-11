const CustomerService = require('../service/CustomerService');

async function getCustomer(request, response) {
    CustomerService.getCustomer(request, response);
}

async function saveCustomer(request, response) {
    CustomerService.saveCustomer(request, response);
}

async function updateCustomer(request, response) {
    CustomerService.updateCustomer(request, response);
}

async function updateCustomerPhoto(request, response) {
    CustomerService.updateCustomerPhoto(request, response);
}

module.exports = { getCustomer, saveCustomer, updateCustomer, updateCustomerPhoto }