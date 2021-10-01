import { Alert } from 'react-native';
import api from './api';

const sendEmailConfirmation = async (email_address) => {

    console.log(email_address);

    const data = { email_address };

    await api.post('send_email_confirmation', data)
    .then(function (response) {
        Alert.alert(response.data.res);
    })
    .catch(function(error) {
        Alert.alert(error.message);
    })
}

module.exports = { sendEmailConfirmation }