import React, { useState, useEffect, createContext } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../services/api";


const AuthContext = createContext({ signed: false, idUser: 0, signIn(email, password){}, logOut(){} });

export const AuthProvider = ({ children }) => {

    const [signed, setSigned] = useState(false);
    const [idUser, setIdUser] = useState(0);

    useEffect(() => {
        async function loadStorageData() {
            const storagedIdUser = await AsyncStorage.getItem('@EBAuth:idUser');
            const storagedToken = await AsyncStorage.getItem('@EBAuth:token');

            if (storagedIdUser && storagedToken) {
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
                setSigned(true);
                setIdUser(storagedIdUser);
            }
        }

        loadStorageData();
    })

    async function signIn(email, password) {
        await api.get('customer_user_sigin', {params: {email: email, password: password}})
        .then(function(response) {
            setSigned(response.data.signed);
            setIdUser(response.data.user);

            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

            AsyncStorage.setItem('@EBAuth:idUser', response.data.user);
            AsyncStorage.setItem('@EBAuth:token', response.data.token);
        })
        .catch(function(error) {
            Alert.alert(error.message);
        })
    }

    async function logOut() {
        await api.post('customer_user_logout')
        .then(function(response) {
            console.log(response.status);
            if (response.status === 200) {
                AsyncStorage.clear().then(() => {
                    setSigned(false);
                    setIdUser(0);
                })                
            }
        })
        .catch(function(error) {
            Alert.alert(error.message);
        })
        
    }

    return(
        <AuthContext.Provider value={{ signed: signed, idUser: idUser, signIn, logOut }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;