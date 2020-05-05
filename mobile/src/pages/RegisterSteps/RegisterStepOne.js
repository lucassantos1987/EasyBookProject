import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import styles from './style';

export default function RegisterStepOne() {

    const navigation = useNavigation();

    function navigateToRegisterStepTwo() {
        navigation.navigate('RegisterStepTwo');
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>O que você é?</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.textContent}>Eu sou</Text>
                <RNPickerSelect
                    style={styles.selectContent}
                    items={[
                        { label: 'Cliente', value: 'C' },
                        { label: 'Profissional', value: 'P' },
                        { label: 'Cliente/Profissinal', value: 'A' },
                    ]}
                />
            </View>
            <View style={styles.next}>
                <TouchableOpacity 
                    style={styles.buttonNext}
                    onPress={navigateToRegisterStepTwo}>
                    <Text style={styles.textButtonNext}>Próximo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}