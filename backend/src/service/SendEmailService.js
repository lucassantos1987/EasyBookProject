const nodemailer = require('nodemailer');

async function sendEmailConfirmation(request, response) {

    const smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'azbookapp@gmail.com',
            pass: 'az2020book'
        }
    })
    
    const email = {
        from: "azbookapp@gmail.com",
        to: "lucas.rafael.silva.santos@gmail.com",
        subject: "Teste envio email node js",
        text: "Testando envio email node js 1 2 3"
    }
    
    await smtpTransport.sendMail(email)
    .then(response => {
        smtpTransport.close();
        console.log("Email enviado com sucesso");
    })
    .catch(error => {
        smtpTransport.close();
        console.log(error.message + ". Não foi possível enviar email.")
    })
}

module.exports = { sendEmailConfirmation }