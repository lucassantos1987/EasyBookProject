import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, Linking } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useRoute } from '@react-navigation/native';
import call from 'react-native-phone-call';

import api from '../../services/api';
import styles from './styles';
import providerImg from '../../assets/user2.jpg';

export default function InfoProvider() {

    const[name, setName] = useState('');
    const[address, setAddress] = useState('');
    const[district, setDistrict] = useState('');
    const[city, setCity] = useState('');
    const[image, setImage] = useState('');
    const[state, setState] = useState('');
    const[whatsapp, setWhatsapp] = useState('');
    const[loading, setLoading] = useState(false);
    const route = useRoute();

    const id_provider = route.params.provider;

    useEffect(() => {
        loadInfoProvider();
    }, [])

    async function loadInfoProvider() {
        setLoading(true);
        await api.get('provider', { params: { id_provider: id_provider }})
        .then(response => {
            setLoading(false);
            var dataS = JSON.stringify(response.data);
            var dataP = JSON.parse(dataS);
            var data = dataP[0];
    
            setName(data.name + " " + data.last_name);
            setAddress(data.address + ", " + data.number);
            setDistrict(data.district);
            setCity(data.city);
            setState(data.state);
            setWhatsapp(data.prefix_whatsapp + " " + data.whatsapp);
            setImage('http://192.168.0.108:3333/upload/resized/' + data.photo);
        }).catch(error => {
            setLoading(false);
            Alert.alert(error);
        })
    }

    function callWhatsapp (text) {
        Linking.openURL(`https://api.whatsapp.com/send?phone=${text}`);
    }

    function makeCall(number) {
        Linking.openURL(`tel:${number}`)
    }

    return(
        <View style={styles.containerInfo}>
            <Spinner
                visible={loading}
                textContent={'Carregando Dados...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.infoContainer}>
                <Image source={ image == '' ? require('../../assets/user2.jpg') : { uri: image }} style={styles.providerImg}/>
                <View style={styles.info}>    
                    <Text style={styles.textInfoName}>{name}</Text>
                    <Text style={styles.textInfo}>{address}</Text>
                    <Text style={styles.textInfo}>{district}</Text>
                    <Text style={styles.textInfo}>{city + " - " + state}</Text>
                </View>
            </View>
            <View style={styles.contacts}>
                <TouchableOpacity 
                    style={styles.buttonContactsWhats}
                    onPress={() => callWhatsapp(whatsapp)}>
                    <Text style={styles.textButtonContacts}>WhatsApp</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => makeCall(whatsapp)}
                    style={styles.buttonContactsFone}>
                    <Text style={styles.textButtonContacts}>Telefone</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}