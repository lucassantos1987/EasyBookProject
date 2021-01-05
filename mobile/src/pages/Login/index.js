import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, TextInput, Text, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';

import logo from '../../assets/logoLogin.png';
import api from '../../services/api';
import styles from './style';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [type_user, setType_user] = useState('');

    const navigation = useNavigation();

    const email_input = useRef();
    const password_input = useRef();

    function navigateToRegister() {
        navigation.navigate('Register');
    }

    function navigateToRegisterCustomer() {
        navigation.navigate('RegisterCustomer');
    }

    function navigateToMenu() {
        navigation.navigate('Menu');
    }

    function navigateToMenuCustomer() {
        navigation.navigate('MenuCustomer');
    }

    function setId_Provider_Session(value) {
        AsyncStorage.setItem('id_provider', String(value));
    }

    function setEmail_Session(value) {
        AsyncStorage.setItem('email', value);
    }

    function setPassword_Session(value) {
        AsyncStorage.setItem('password', value);
    }

    function setId_Customer_Session(value) {
        AsyncStorage.setItem('id_customer', String(value));
    }

    async function sigin() {
        if (email != '' && password != '' && type_user != '') {

            if (type_user == 'P') {
                await api.get('provider_user', { params: { email: email, password: password } })
                    .then(response => {

                        if (response.data != '') {
                            var dataS = JSON.stringify(response.data);
                            var dataP = JSON.parse(dataS);
                            var data = dataP[0];

                            setId_Provider_Session(data.id_provider);
                            setEmail_Session(data.email);
                            setPassword_Session(data.password);

                            navigateToMenu();
                        } else {
                            Alert.alert("Usuário não existe.");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else if (type_user == 'C') {
                await api.get('customer_user', { params: { email: email, password: password } })
                    .then(response => {

                        if (response.data != '') {
                            var dataS = JSON.stringify(response.data);
                            var dataP = JSON.parse(dataS);
                            var data = dataP[0];

                            setId_Customer_Session(data.id_customer);
                            setEmail_Session(data.email);
                            setPassword_Session(data.password);

                            navigateToMenuCustomer();
                        } else {
                            Alert.alert("Usuário não existe.");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {
                Alert.alert("Usuário não encontrado.");
            }
        } else {
            Alert.alert("Preencha os campos corretamente.");
        }
    }

    function onChangeTypeUser(value) {
        setType_user(value);
    }

    const pickerStyle = {
        inputIOS: {
            color: 'white',
            paddingTop: 13,
            paddingHorizontal: 10,
            paddingBottom: 12,
        },
        inputAndroid: {
            color: 'white',
        },
        placeholderColor: 'white',
        color: '#FFF',
        underline: { borderTopWidth: 0 },
        icon: {
            position: 'absolute',
            backgroundColor: '#FFF',
            borderTopWidth: 5,
            borderTopColor: '#00000099',
            borderRightWidth: 5,
            borderRightColor: 'transparent',
            borderLeftWidth: 5,
            borderLeftColor: 'transparent',
            width: 0,
            height: 0,
            top: 20,
            right: 15,
        },
    };

    return (
        <View style={styles.container}>
            <View style={styles.login}>
                <View style={{ alignItems: 'center' }}>
                </View>
                <TextInput
                    ref={email_input}
                    style={styles.loginInput}
                    placeholder="Digite seu email..."
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    onSubmitEditing={() => password_input.current.focus()}
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

                <View style={{ alignItems: 'flex-start', marginTop: 20, paddingHorizontal: 10 }}>
                    <Text style={styles.textLabel}>Eu sou: </Text>
                    <RNPickerSelect
                        style={{ backgroundColor: '#FFF' }}
                        value={type_user}
                        onValueChange={(value) => onChangeTypeUser(value)}
                        items={[
                            { label: 'Cliente', value: 'C' },
                            { label: 'Profissional', value: 'P' },
                        ]}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={styles.buttonRegister}
                onPress={navigateToRegister}>
                <Text style={styles.textButtonRegister}>
                    Sou PROFISSIONAL e não tenho cadastro. CLIQUE AQUI
                    </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonRegisterCustomer}
                onPress={navigateToRegisterCustomer}>
                <Text style={styles.textButtonRegister}>
                    Procuro por serviços e não tenho cadastro. CLIQUE AQUI
                    </Text>
            </TouchableOpacity>
            <View style={styles.containerLogin}>
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={sigin}>
                    <Text style={styles.textButtonLogin}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}