const soap = require('soap');

async function checkCriminalAntecendents() {
    var url = 'https://apigateway.conectagov.estaleiro.serpro.gov.br/api-antecedentes-criminais/v1/certidao';
    
    await soap.createClient(url, function (err, client) {
        client.consultaAntecedentesCriminais({ nome: "Lucas Rafael da Silva Santos", dataNascimento: "09/02/1987" }, function (err, result) {

            if (err)
                return console.log(err);

            console.log(result.return);
        });

        console.log(err);
    });
}

module.exports = { checkCriminalAntecendents }