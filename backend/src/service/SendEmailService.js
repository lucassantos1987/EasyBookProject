const nodemailer = require('nodemailer');

async function sendEmailConfirmation(request, response) {

    const { email_address } = request.body;
    
    const smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'azbookapp@gmail.com',
            pass: 'az2020book'
        }
    })
    
    console.log(email_address);

    const email = {
        from: "azbookapp@gmail.com",
        to: email_address,
        subject: "Confirmação de cadastro no EasyBookApp",
        text: "Olá, tudo bem? Muito obrigado por se cadastrar na nossa plataforma."
    }
    
    await smtpTransport.sendMail(email)
    .then(function() {        
        smtpTransport.close();
        return response.json({ res: "Email de confirmação enviado com sucesso." });
    })
    .catch(function(error) {
        smtpTransport.close();
        return response.json({ res: error.message });
    })
}

module.exports = { sendEmailConfirmation }