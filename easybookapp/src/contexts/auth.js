import React, { useState, useEffect, createContext } from 'react';
import { Alert } from 'react-native';
import api from "../services/api";


const AuthContext = createContext({ signed: false, idUser: 0, signIn(email, password){}, logOut(){} });

export const AuthProvider = ({ children }) => {

    const [signed, setSigned] = useState(false);
    const [idUser, setIdUser] = useState(0);

    async function signIn(email, password) {
        await api.get('customer_user_sigin', {params: {email: email, password: password}})
        .then(function(response) {
            setSigned(response.data.signed);
            setIdUser(response.data.user);
        })
        .catch(function(error) {
            Alert.alert(error.message);
        })
    }

    function logOut() {
        setSigned(false);
    }

    return(
        <AuthContext.Provider value={{ signed: signed, idUser: idUser, signIn, logOut }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;