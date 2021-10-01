const ProviderDAO = require('../dao/ProviderDAO');

async function getProvider(request, response) {
    ProviderDAO.getProvider(request, response);
}

async function saveProvider(request, response) {
    const {
        name,
        last_name,
        address,
        number,
        complement,
        district,
        city,
        state,
        zip_code,
        whatsapp,
        obs,
        photo,
        latitude,
        longitude,
        email_address,
        password,
        id_category
    } = request.body;

    if (name.trim() == '') {

        Alert.alert("Digite seu Nome");

    } else if (last_name.trim() == '') {

        Alert.alert("Digite seu Sobrenome");

    } else if (whatsapp.trim() == '') {

        Alert.alert("Digite seu número do WhatsApp");

    } else if (zip_code.trim() == '') {

        Alert.alert("Digite seu Cep");

    } else if (number.trim() == '') {

        Alert.alert("Dígite o Número de Endereço");

    } else if (photo.trim() == '') {

        Alert.alert("Selecione sua Foto");

    } else if (email_address.trim() == '') {

        Alert.alert("Digite seu Email");

    } else if (password.trim() == '') {

        Alert.alert("Digite sua Senha");

    } else if (!id_category) {

        Alert.alert("Selecione sua Categoria.");

    } else {

        ProviderDAO.saveProvider(request, response);
    }
}

async function updateProvider(request, response) {
    ProviderDAO.updateProvider(request, response);
}

async function updateProviderPhoto(request, response) {
    ProviderDAO.updateProviderPhoto(request, response);
}

module.exports = { getProvider, saveProvider, updateProvider, updateProviderPhoto }