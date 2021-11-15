import { React, useState, useEffect } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';
import api from '../../services/api';

export default function Rating() {

    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Carregando Avaliações...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.header}>
                <TouchableOpacity style={styles.buttonHeaderBack}
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={26} color="#FFFFFF"/>
                </TouchableOpacity>
                <Text style={styles.textHeader}>Avaliações</Text>
            </View>
            <View></View>
            <View></View>
        </View>
    );
}