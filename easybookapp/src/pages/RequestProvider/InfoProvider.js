import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, Linking } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Rating } from 'react-native-ratings';

import api from '../../services/api';
import styles from './styles';

export default function InfoProvider() {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [image, setImage] = useState('');
    const [state, setState] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [obs, setObs] = useState('');
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(5);


    const route = useRoute();

    const id_provider = route.params.provider;

    const navigation = useNavigation();

    const url = "http://192.168.0.109:3333";

    useEffect(() => {
        loadInfoProvider();
    }, [])

    async function loadInfoProvider() {
        setLoading(true);
        await api.get('provider', { params: { id_provider: id_provider } })
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
                setObs(data.obs);
                setImage(url + '/photosprofileeasybook/resized/' + data.photo);
            }).catch(error => {
                setLoading(false);
                Alert.alert(error);
            })
    }

    function callWhatsapp(text) {
        Linking.openURL(`https://api.whatsapp.com/send?phone=${text}`);
    }

    function makeCall(number) {
        Linking.openURL(`tel:${number}`)
    }

    return (
        <View style={styles.containerInfo}>
            <Spinner
                visible={loading}
                textContent={'Carregando Dados...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.headerInfoProvider}>
                <TouchableOpacity style={styles.buttonHeaderBack}
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={26} color="#8e44ad"/>
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <Image source={image == '' ? require('../../assets/user2.jpg') : { uri: image }} style={styles.providerImg} />
                <Rating
                    imageSize={30}
                    readonly
                    fractions={1} 
                    ratingCount={5} 
                    startingValue={rating} 
                    style={{ top: -65 }}/>
                <View style={styles.info}>
                    <Text style={styles.textInfoName}>{name}</Text>
                    <Text style={styles.textInfo}>{address}</Text>
                    <Text style={styles.textInfo}>{district}</Text>
                    <Text style={styles.textInfo}>{city + " - " + state}</Text>

                </View>
            </View>
            <View style={styles.contacts}>
            <TouchableOpacity
                    style={styles.buttonRating}
                    onPress={() => callWhatsapp(whatsapp)}>
                    <Text style={styles.textButtonContacts}>Ver Avaliações</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonContactsWhats}
                    onPress={() => callWhatsapp(whatsapp)}>
                    <Text style={styles.textButtonContacts}>Mensagem</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}