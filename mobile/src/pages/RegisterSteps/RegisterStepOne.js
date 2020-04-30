import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './style';

export default function RegisterStepOne() {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>O que você é?</Text>
            </View>
            <View style={styles.next}>
                <TouchableOpacity 
                    style={styles.buttonNext}>
                    <Text style={styles.textButtonNext}>Próximo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}