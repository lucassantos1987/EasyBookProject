const SendEmailService = require('../service/SendEmailService');

async function sendEmailConfirmation(request, response) {
    SendEmailService.sendEmailConfirmation(request, response);
}

module.exports =  { sendEmailConfirmation }
