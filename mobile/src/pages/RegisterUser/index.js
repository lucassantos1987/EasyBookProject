import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import PasswordInputText from 'react-native-hide-show-password-input';

import styles from './style';

import user from '../../assets/user2.jpg';

import api from '../../services/api';

export default function RegisterUser() {

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    const id_provider = route.params.idprovider;

    console.log(id_provider);

    async function handleRegister() {
        const data = {
            id_provider,
            username,
            password
        }

        setLoading(true);
        await api.post('provider_user', data)
        .then(() => {
            Alert.alert("Sucesso");
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
            console.error;
        });
    }

    return (
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Carregando...'}
                textStyle={styles.spinnerTextStyle}/>
            <View style={styles.header}>
                <Text>
                    Registre seus dados de acesso
                </Text>
            </View>
            <View style={styles.content}>
                <TextInput
                    style={styles.inputContent}
                    placeholder="Digite seu nome de usuário"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    autoCapitalize="none"/>
                <PasswordInputText
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={ (text) => setPassword(text) }/>
                <TouchableOpacity
                            style={styles.buttonRegister}
                            onPress={handleRegister}>
                            <Text style={styles.textButtonContent}>
                                Cadastrar
                            </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}