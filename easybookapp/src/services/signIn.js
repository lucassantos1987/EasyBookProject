import api from "./api";

const signIn = async (email, password) => {

    api.get('customer_user_sigin', {params: {email: email, password: password}})
    .then(response => {
        console.log(response.data.token);
        console.log(response.data.user);
    })
    .catch(error => {
        console.log("error: " + error);
    });
}

module.exports = { signIn }