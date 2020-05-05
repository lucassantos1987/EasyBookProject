import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

export default function RegisterStepThree() {

    const navigation = useNavigation();

    function navigateToRegisterStepFour() {
        navigation.navigate('RegisterStepFour');
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Telefone, Celular/WhatssApp</Text>
            </View>
            <View style={styles.content}>
                <TextInput
                    style={styles.inputContent}
                    placeholder="Digite seu número para contato"
                    returnKeyType="next"/>
            </View>
            <View style={styles.next}>
                <TouchableOpacity 
                    style={styles.buttonNext}
                    onPress={navigateToRegisterStepFour}>
                    <Text style={styles.textButtonNext}>Próximo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}