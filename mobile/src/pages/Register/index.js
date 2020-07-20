import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';

import styles from './style';

import user from '../../assets/user2.jpg';
import style from './style';

const i_cep = require('awesome-cep');

export default function Register() {

    const[name, setName] = useState('');
    const[whatsApp, setWhatsApp] = useState('');
    const[cep, setCep] = useState('');
    const[address, setAddress] = useState('');
    const[number, setNumber] = useState('');
    const[district, setDistrict] = useState('');
    const[city, setCity] = useState('');
    const[state, setState] = useState('');
    const[photo, setPhoto] = useState(null);
    const[loading, setLoading] = useState(false);
    const navigation = useNavigation();

    function getCep() {
        setLoading(true);
        if (cep != "") {
            i_cep.findCEP(cep)
            .then(response => {
                setAddress(response.address_type + " " + response.address_name);
                setDistrict(response.district);
                setCity(response.city);
                setState(response.state);
                setLoading(false);
            })
            .catch (error => {
                setAddress('');
                setDistrict('');
                setCity('');
                setState('');
                setLoading(false);
                Alert.alert(error.message);
            });
        } else {
            setAddress('');
            setDistrict('');
            setCity('');
            setState('');
            setLoading(false);
            Alert.alert("Digite o cep");
        }
    }
    async function handleRegister() {

        const data = {
            name,
            whatsApp,
            cep,
            number,
            district,
            city,
            state
        };
    }

    async function _pickImage() {
        let result = ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        .then(() => {
            if (!result.cancelled) {
                Alert.alert(result.uri);
                setPhoto(result.uri);
            }
            console.log(result);
        })
        .catch(error => {
            Alert.alert(error);
            console.log(result);
        });
    }

    return(
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Carregando...'}
                textStyle={styles.spinnerTextStyle}/>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                </View>
                <View style={styles.content}>
                    <TextInput
                        style={styles.inputContent}
                        placeholder="Nome"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        returnKeyType="next"/>
                    <TextInput
                        style={styles.inputContent}
                        placeholder="WhatsApp DDD 999999999"
                        value={whatsApp}
                        onChangeText={(text) => setWhatsApp(text)}
                        returnKeyType="next"
                        keyboardType={'numeric'}/>
                    <TextInput
                        style={styles.inputContent}
                        placeholder="Informe seu Cep"
                        value={cep}
                        onChangeText={(text) => setCep(text)}
                        returnKeyType="next"
                        keyboardType={'numeric'}
                        maxLength={8}/>
                    <TouchableOpacity
                        style={styles.buttonContent}
                        onPress={getCep}>
                        <Text style={styles.textButtonContent}>
                            Pesquisar CEP
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.inputContent}
                        placeholder="Endereço"
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                        editable={false}
                        selectTextOnFocus={false}/>
                    <TextInput
                        style={styles.inputContent}
                        placeholder="Número"
                        value={number}
                        onChangeText={(text) => setNumber(text)}/>
                    <TextInput
                        style={style.inputContent}
                        placeholder="Bairro"
                        value={district}
                        onChangeText={(text) => setDistrict(text)}
                        editable={false}
                        selectTextOnFocus={false}/>    
                    <TextInput
                        style={styles.inputContent}
                        placeholder="Cidade"
                        value={city}
                        onChangeText={(text) => setCity(text)}
                        editable={false}
                        selectTextOnFocus={false}/>
                    <TextInput
                        style={styles.inputContent}
                        placeholder="Estado"
                        value={state}
                        onChangeText={(text) => setState(text)}
                        editable={false}
                        selectTextOnFocus={false}/>
                    <View style={styles.user}>
                        <Text style={{ top: -20, fontSize: 18 }}>
                            Agora selecione uma foto para que os clientes identifique você.
                        </Text>
                        <Image source={photo != null ? photo : user} style={styles.imageUser}/>
                    </View>    
                    <TouchableOpacity style={styles.buttonContentUserImage}
                        onPress={_pickImage}>
                        <Text style={styles.textButtonContent}>Selecionar Foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContentUserImage}>
                        <Text style={styles.textButtonContent}>Tirar Foto</Text>
                    </TouchableOpacity>                    
                </View>
            </ScrollView>
        </View>
    );
}