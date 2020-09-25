import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';

import styles from './style';
import user from '../../assets/user2.jpg';
import api from '../../services/api';
const i_cep = require('awesome-cep');

export default function Register() {
    const[name, setName] = useState('');
    const[last_name, setLast_Name] = useState('');
    const[whatsapp, setWhatsapp] = useState('');
    const[prefix_whatsapp, setPrefix_WhatsApp] = useState('+55');
    const[zip_code, setZip_Code] = useState('');
    const[address, setAddress] = useState('');
    const[number, setNumber] = useState('');
    const[complement, setComplement] = useState('');
    const[district, setDistrict] = useState('');
    const[city, setCity] = useState('');
    const[state, setState] = useState('');
    const[latitude, setLatitude] = useState('');
    const[longitude, setLongitude] = useState('');
    const[obs, setObs] = useState('');
    const[photo, setPhoto] = useState('');
    const[loading, setLoading] = useState(false);
    const navigation = useNavigation();

    function getCep() {
        setLoading(true);
        if (zip_code != "") {
            i_cep.findCEP(zip_code)
            .then(response => {
                setAddress(response.address_type + " " + response.address_name);
                setDistrict(response.district);
                setCity(response.city);
                setState(response.state);
                setLatitude(response.lat);
                setLongitude(response.lng);
                setLoading(false);
            })
            .catch (error => {
                setAddress('');
                setDistrict('');
                setCity('');
                setState('');
                setLatitude('');
                setLongitude('');
                setLoading(false);
                Alert.alert(error.message);
            });
        } else {
            setAddress('');
            setDistrict('');
            setCity('');
            setState('');
            setLatitude('');
            setLongitude('');
            setLoading(false);
            Alert.alert("Digite o cep");
        }
    }

    function navigateToRegisterUser(idprovider) {
        navigation.navigate('RegisterUser', { idprovider} );        
    }

    async function handleRegister() {
        const data = {
            name,
            last_name,
            address,
            number,
            complement,
            district,
            city,
            state,
            zip_code,            
            whatsapp,
            obs,
            photo,
            latitude,
            longitude
        };

        if (name.trim() == '') {
            Alert.alert("Digite seu Nome");
        } else if (last_name.trim() == '') {
            Alert.alert("Digite seu Sobrenome");
        } else if (whatsapp.trim() == '') {
            Alert.alert("Digite seu número do WhatsApp");
        } else if (zip_code.trim() == '') {
            Alert.alert("Digite seu Cep");
        } else if (number.trim() == '') {
            Alert.alert("Dígite o Número de Endereço");
        } else if (photo == '') {
            Alert.alert("Selecione sua Foto");
        } else {
            setLoading(true);
            await api.post('provider', data)
            .then(function(response) {
                console.log(response.data.result[0]);
                setLoading(false);
                navigateToRegisterUser(response.data.result[0]);
            }).catch(function(error) {
                setLoading(false);
                Alert.alert(error.message);
            });    
        }
    }

    async function _pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        .then((response) => {
            if (!response.cancelled) {
                setPhoto(response.uri);
                console.log(photo);
            }
        })
        .catch(error => {
            console.log(error.message);
        });
    }

    async function _takePhtoPickImage() {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        .then((response) => {
            if (!response.cancelled) {
                setPhoto(response.uri);
                console.log(photo);
            }
        })
        .catch(error => {
            console.log(error.message);
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
                    <Text style={styles.textHeader}>Informe seus dados</Text>
                </View>
                <View style={styles.content}>
                    <TextInput
                        style={styles.inputContent}
                        maxLength={20}
                        placeholder="Nome"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        returnKeyType="next"/>
                    <TextInput
                        style={styles.inputContent}
                        maxLength={20}
                        placeholder="Sobrenome"
                        value={last_name}
                        onChangeText={(text) => setLast_Name(text)}
                        returnKeyType="next"/>
                    <TextInputMask
                        style={styles.inputContent}
                        type={"cel-phone"}
                        options={{
                            maskType: "BRL",
                            withDDD: true,
                            dddMask: "(99) "
                        }}
                        placeholder="Número WhatsApp (99) 99999-9999"
                        value={whatsapp}
                        onChangeText={(text) => setWhatsapp(text)}
                        returnKeyType="next"
                        keyboardType={'numeric'}/>
                    <TextInput
                        style={styles.inputContent}
                        placeholder="Informe seu Cep"
                        value={zip_code}
                        onChangeText={(text) => setZip_Code(text)}
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
                        style={styles.inputContent}
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
                        <Image source={{ uri: photo }} style={styles.imageUser}/>
                    </View>    
                    <TouchableOpacity 
                        style={styles.buttonContentUserImage}
                        onPress={_pickImage}>
                        <Text style={styles.textButtonContent}>Selecionar Foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonContentUserImage}
                        onPress={_takePhtoPickImage}>
                        <Text style={styles.textButtonContent}>Tirar Foto</Text>
                    </TouchableOpacity>                    
                    <TouchableOpacity
                        style={styles.buttonRegister}
                        onPress={handleRegister}>
                        <Text style={styles.textButtonContent}>
                            Gravar Informações
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}