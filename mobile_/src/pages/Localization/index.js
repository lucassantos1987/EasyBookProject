import React from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
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

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Pesquisar Serviços</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.buttonHeaderBack}>
                    <Text style={styles.textButtonHeaderBack}>VOLTAR</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.title}>
                <Text style={styles.textTitle}>Antes de solicitar o profissional, precisamos saber sua localização.</Text>
            </View>
            <View style={styles.content}>
                <TouchableOpacity style={styles.buttonContent}>
                    <Text style={styles.textButtonContent}>Informar Minha Localização</Text>
                </TouchableOpacity>
                <TextInput style={styles.inputContent} />
                <TextInput style={styles.inputContent} />
                <TextInput style={styles.inputContent} />
                <TextInput style={styles.inputContent} />
            </View>
            <View style={styles.toSearch}>
                <TouchableOpacity
                    style={styles.buttonToSearch}
                    onPress={navigateToRequestCategory}>
                    <Text style={styles.textButtonToSearch}>Pesquisar Profissionais</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}