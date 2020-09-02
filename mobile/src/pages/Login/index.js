import React from 'react';
import { View, TouchableOpacity, TextInput, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import logo from '../../assets/logoLogin.png';

import styles from './styles';

export default function Login() {

    const navigation = useNavigation();

    function navigateToRegister() {
        navigation.navigate('Register');
    }

    function navigateToMenu() {
        navigation.navigate('Menu');
    }

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
            <TouchableOpacity 
                style={styles.buttonLogin}
                onPress={navigateToMenu}>
                <Text style={styles.textButtonLogin}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttonRegister}
                onPress={navigateToRegister}>
                <Text style={styles.textButtonRegister}>Esqueci minha senha. CLIQUE AQUI</Text>
            </TouchableOpacity>
        </View>
    );
}