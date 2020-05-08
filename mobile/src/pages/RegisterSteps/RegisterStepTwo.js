import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

export default function RegisterStepTwo() {

    const navigation = useNavigation();

    function navigateToRegisterStepThree() {
        navigation.navigate('RegisterStepThree');
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Qual seu nome?</Text>
            </View>
            <View style={styles.content}>
                <TextInput
                    style={styles.inputContent}
                    placeholder="Digite seu nome"
                    returnKeyType="next"/>
                <TextInput
                    style={styles.inputContent}
                    placeholder="Digite seu sobrenome"
                    returnKeyType="next"/>

            </View>
            <View style={styles.next}>
                <TouchableOpacity 
                    style={styles.buttonNext}
                    onPress={navigateToRegisterStepThree}>
                    <Text style={styles.textButtonNext}>Próximo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}