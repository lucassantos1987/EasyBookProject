import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

import styles from './style';

export default function Location() {
    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.textTitle}>Antes de solicitar um serviço, precisamos saber sua localização.</Text>
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
                <TouchableOpacity style={styles.buttonToSearch}>
                    <Text style={styles.textButtonToSearch}>Solicitar Profissional</Text>
                </TouchableOpacity>
            </View>
        </View> 
    );
}