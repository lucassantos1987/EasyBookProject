import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, TextInput, Text, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

import api from '../../services/api';
import styles from './style';


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    function onChangeTypeUser(value) {
        setType_user(value);
    }

    async function sigIn() {

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

    return (
        <View style={styles.container}>
            <View style={styles.login}>
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

                <DropDownPicker
                    items={[
                        {label: 'CLIENTE', value:'C'},
                        {label: 'PROFISSIONAL', value: 'P'}
                    ]}
                    containerStyle={{ height: 60 }}
                    style={{ backgroundColor: '#FFFFFF', marginTop: 10}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    value={type_user}
                    onChangeItem={item => onChangeTypeUser(item.value)}
                />

            </View>
            <View style={styles.containerLogin}>
                <TouchableOpacity
                    style={styles.buttonSignUpCustomer}
                    onPress={navigateToRegisterCustomer}>
                    <Text style={styles.textButtonSignUpCustomer}>
                        Sou cliente e não sou cadastradado
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonSignUpProvider}
                    onPress={navigateToRegister}>
                    <Text style={styles.textButtonSignUpProvider}>
                        Sou profissional e não sou cadastradado
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={sigIn}>
                    <Text style={styles.textButtonLogin}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}