import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, TextInput, Text, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from '@react-native-community/async-storage';

import logo from '../../assets/logoLogin.png';
import api from '../../services/api';
import styles from './styles';

export default function Login() {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[name, setName] = useState('');
    
    const navigation = useNavigation();

    const email_input = useRef();
    const password_input = useRef();

    function navigateToRegister() {
        navigation.navigate('Register');
    }

    function navigateToMenu() {
        navigation.navigate('Menu');
    }

    function setId_Provider_Session(value) {
        AsyncStorage.setItem('id_provider', value);
    }

    function setEmail_Session(value) {
        AsyncStorage.setItem('email', value);
    }

    function setPassword_Session(value) {
        AsyncStorage.setItem('password', value);
    }

    async function sigin() {
        console.log(email);
        console.log(password);
        await api.get('provider_user', { params: { email: email, password: password } })
        .then(response => {
                var dataS = JSON.stringify(response.data);
                var dataP = JSON.parse(dataS);
                var data = dataP[0];

                console.log("Aqui" + data.id_provider);

                setId_Provider_Session(data.id_provider);
                setEmail_Session(data.email);
                setPassword_Session(data.password);
    
                Alert.alert("Usuario existe");    

        })
        .catch(error => {
            console.log(error);
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.login}>
                <View style={{ alignItems: 'center'}}>                    
                </View>
                <TextInput
                        ref={email_input}
                        style={styles.loginInput}
                        maxLength={20}
                        placeholder="Digite seu email..."
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        onSubmitEditing={() => password_input.current.focus() }
                        blurOnSubmit={false}
                        returnKeyType="next"
                        autoCapitalize="none"
                />                
                <TextInput
                        ref={password_input}
                        style={styles.loginInput}
                        maxLength={20}
                        placeholder="Digite sua senha..."
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        returnKeyType="go"
                        autoCapitalize="none"
                        secureTextEntry
                />                
            </View>
            <TouchableOpacity 
                style={styles.buttonLogin}
                onPress={sigin}>
                <Text style={styles.textButtonLogin}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}