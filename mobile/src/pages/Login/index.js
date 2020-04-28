import React from 'react';
import { View, TouchableOpacity, TextInput, Text, Image } from 'react-native';

import logo from '../../assets/logoLogin.png';

import styles from './styles';

export default function Login() {
    return(
        <View style={styles.container}>
            <View style={styles.login}>
                <View style={{ alignItems: 'center'}}>
                    <Image source={logo}/>
                </View>    
                <TextInput 
                    style={styles.loginInput}
                    returnKeyType="next"
                    placeholder='Digite seu Email...'
                    autoCapitalize = 'none'/>
                <TextInput 
                    style={styles.loginInput}
                    placeholder='Digite sua Senha...'
                    secureTextEntry
                    returnKeyType="go"
                    autoCapitalize="none"/>
            </View>
            <TouchableOpacity style={styles.buttonLogin}>
                <Text style={styles.textButtonLogin}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRegister}>
                <Text style={styles.textButtonRegister}>Não sou cadastrado. CLIQUE AQUI</Text>
            </TouchableOpacity>
        </View>
    );
}