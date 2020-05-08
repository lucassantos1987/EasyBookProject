import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './style';

export default function RegisterStepFour() {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Falta pouco...</Text>
                <Text style={styles.textHeader}>Deixe sua linda foto</Text>
            </View>
            <View style={styles.content}>
                <TouchableOpacity style={styles.buttonContent}>
                    <Text style={styles.textButtonContent}>Selecionar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContent}>
                    <Text style={styles.textButtonContent}>Tirar Foto</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.next}>
                <TouchableOpacity 
                    style={styles.buttonNext}>
                    <Text style={styles.textButtonNext}>Gravar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}