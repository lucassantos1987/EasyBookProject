import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

export default function Location() {

    const navigation = useNavigation();

    function navigateToRequestCategory() {
        navigation.navigate('RequestCategory');
    }

    function navigateToRegister() {
        navigation.navigate('Register');
    }

    function navigateToLogin() {
        navigation.navigate('Login');
    }

    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.textTitle}>Antes de solicitar o profissional, precisamos saber sua localização.</Text>
            </View>
            <View style={styles.localization}>
                <TouchableOpacity style={styles.buttonLocalization}>
                    <Text style={styles.textButtonLocalization}>Informar Minha Localização</Text>
                </TouchableOpacity>
                <TextInput style={styles.inputLocalization}/>
                <TextInput style={styles.inputLocalization}/>
                <TextInput style={styles.inputLocalization}/>
                <TextInput style={styles.inputLocalization}/>
            </View>
            <View style={styles.toSearch}>
                <TouchableOpacity 
                    style={styles.buttonRegister}
                    onPress={navigateToRegister}>
                    <Text style={styles.textButtonRegister}>Sou Profissional e não tenho cadastro. CLIQUE AQUI</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonLogin}
                    onPress={navigateToLogin}>
                    <Text style={styles.textButtonRegister}>Sou Profissional, e tenho cadastro. CLIQUE AQUI</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonToSearch}
                    onPress={navigateToRequestCategory}>
                    <Text style={styles.textButtonToSearch}>Solicitar Profissional</Text>
                </TouchableOpacity>
            </View>
        </View> 
    );
}