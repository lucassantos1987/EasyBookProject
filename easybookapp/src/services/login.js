import api from "./api";

const login = async (email, password) => {

    const data = {
        email,
        password
    };

    await api.get('customer_user', {params: {email: email, password: password}})
    .then(response => {

    })
    .catch(error => {

    });
}

module.exports = { login }