import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

export default function Register() {

    const navigation = useNavigation();

    function navigateToRegisterStepOne() {
        navigation.navigate('RegisterStepOne');
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Antes de usar nossa plataforma, precisamos conhecer um pouco sobre você.</Text>
            </View>
            <View style={styles.next}>
                <TouchableOpacity 
                    style={styles.buttonNext}
                    onPress={navigateToRegisterStepOne}>
                    <Text style={styles.textButtonNext}>Próximo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}