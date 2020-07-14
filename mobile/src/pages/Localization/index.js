import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

export default function Location() {

    const navigation = useNavigation();

    function navigateToRequestCategory() {
        navigation.navigate('RequestCategory');
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
                    style={styles.buttonToSearch}
                    onPress={navigateToRequestCategory}>
                    <Text style={styles.textButtonToSearch}>Solicitar Profissional</Text>
                </TouchableOpacity>
            </View>
        </View> 
    );
}