import api from "./api";

const login = async (email, password) => {

    await api.get('customer_user', {params: {email: email, password: password}})
    .then(response => {
        console.log(response.data.token);
    })
    .catch(error => {
        console.log("error: " + error);
    });
}

module.exports = { login }