import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './style';

export default function Menu() {
    return(
        <View style={styles.container}>
            <View style={styles.menu}>
                <TouchableOpacity style={styles.buttonMenu}>
                    <Text style={styles.textButtonMenu}>Fazer Pedido</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMenu}>
                    <Text style={styles.textButtonMenu}>Solicitar Profissional</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMenu}>
                    <Text style={styles.textButtonMenu}>Meus Dados</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}