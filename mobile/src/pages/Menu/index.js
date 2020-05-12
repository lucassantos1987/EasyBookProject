import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import user from '../../assets/user2.jpg';
import styles from './style';

export default function Menu() {

    const navigation = useNavigation();

    function navigateToLocalization() {
        navigation.navigate('Localization');
    }

    return(
        <View style={styles.container}>
            <View style={styles.menu}>
                <View style={styles.user}>
                    <Image source={user} style={styles.imageUser}/>
                    <Text style={styles.textUser}>Usuario da Silva</Text>
                </View>    
                <TouchableOpacity 
                    style={styles.buttonMenu}
                    onPress={navigateToLocalization}>
                    <Text style={styles.textButtonMenu}>Solicitar Profissional</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMenu}>
                    <Text style={styles.textButtonMenu}>Meus Dados</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}