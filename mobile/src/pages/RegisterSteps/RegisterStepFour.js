import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import user from '../../assets/user2.jpg';
import styles from './style';

export default function RegisterStepFour() {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Falta pouco...</Text>
                <Text style={styles.textHeader}>Deixe sua linda foto</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.user}>
                    <Image source={user} style={styles.imageUser}/>
                </View>    
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