import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

import providerImg from '../../assets/user2.jpg';

export default function InfoProvider() {
    return(
        <View style={styles.containerInfo}>
            <View style={styles.infoContainer}>
                <Image source={providerImg}
                    style={styles.providerImg}/>
                <View style={styles.info}>    
                    <Text style={styles.textInfo}>João da Silva</Text>
                    <Text style={styles.textInfo}>Pedreiro</Text>
                    <Text style={styles.textInfo}>Rua Das Pedras e Cimento, 100</Text>
                    <Text style={styles.textInfo}>Jardim Cascalho</Text>
                    <Text style={styles.textInfo}>Limeira - SP</Text>
                    <Text style={styles.textInfo}>(19) 99432145</Text>
                </View>
            </View>
        </View>
    );
}