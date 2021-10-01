import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style';
import api from '../../services/api';
const i_cep = require('awesome-cep');
const i_uploadPhoto = require('../../services/uploadPhoto');
const i_sendEmail = require('../../services/send-email');

export default function Register() {
    const [name, setName] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [zip_code, setZip_Code] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [obs, setObs] = useState('');
    const [photo_profile, setPhoto_Profile] = useState('');
    const [email_address, setEmail_Address] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg_loading, setMsg_Loading] = useState('');
    const [categories, setCategories] = useState([]);
    const [id_category, setId_Category] = useState('');
    const navigation = useNavigation();

    const lastname_input = useRef();
    const whatsapp_input = useRef();
    const zipcode_input = useRef();
    const number_input = useRef();
    const emailaddress_input = useRef();
    const password_input = useRef();

    useEffect(() => {
        setMsg_Loading("Carregando...");
        loadCategories();
        setLoading(false);
    }, []);

    async function loadCategories() {
        setLoading(true);
        await api.get('category')
        .then(response => {
            setCategories(response.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            Alert.alert(error.message);
        });
    }

    function getCep() {
        setMsg_Loading("Carregando dados do Cep...");
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
                    number_input.current.focus();
                })
                .catch(error => {
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
            zipcode_input.current.focus();
        }
    }

    async function saveProvider() {
        var photo = '';

        setLoading(true);
        setMsg_Loading("Salvando dados...");

        i_uploadPhoto.uploadPhotoProfile(photo_profile)
        .then(response => {

            photo = response;

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
                longitude,
                email_address,
                password,
                id_category
            };
            
            api.post('provider', data)
            .then(function (response) {
                setLoading(false);
                Alert.alert(response.data.message);
                //i_sendEmail.sendEmailConfirmation(email_address);
                //navigation.goBack();
            }).catch(function (error) {
                setLoading(false);
                Alert.alert("Não foi possível realizar o cadastro. Tente novamente." + error.message);
            });            
        })
        .catch(error => {            
            Alert.alert(error.message);
        })
    }

    async function _pickImage() {
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        })
            .then((response) => {
                if (!response.cancelled) {
                    setPhoto_Profile(response.uri);
                    console.log(photo_profile);
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    async function _takePhtoPickImage() {
        await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1
        })
            .then((response) => {
                if (!response.cancelled) {
                    setPhoto_Profile(response.uri);
                    console.log(photo_profile);
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    const dataListCategories = categories.map(item => ({
        label: item.name,
        value: item.id,
        key: item.id
    }))

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Spinner
                visible={loading}
                textContent={msg_loading}
                textStyle={styles.spinnerTextStyle} />
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.buttonHeaderBack}
                        onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={26} color="#8e44ad"/>
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Informe seus dados</Text>
                </View>
                <View style={styles.content}>
                    <TextInput
                        style={styles.inputContent}
                        maxLength={20}
                        placeholder="Nome"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        onSubmitEditing={() => lastname_input.current.focus()}
                        blurOnSubmit={false}
                        returnKeyType="next" />
                    <TextInput
                        ref={lastname_input}
                        style={styles.inputContent}
                        maxLength={20}
                        placeholder="Sobrenome"
                        value={last_name}
                        onChangeText={(text) => setLast_Name(text)}
                        onSubmitEditing={() => whatsapp_input.current._inputElement.focus()}
                        blurOnSubmit={false}
                        returnKeyType="next" />
                    <TextInputMask
                        ref={whatsapp_input}
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
                        onSubmitEditing={() => zipcode_input.current.focus()}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        keyboardType={'numeric'} />
                    <TextInput
                        ref={zipcode_input}
                        style={styles.inputContent}
                        placeholder="Informe seu Cep"
                        value={zip_code}
                        onChangeText={(text) => setZip_Code(text)}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        keyboardType={'numeric'}
                        maxLength={8} />
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
                        selectTextOnFocus={false} />
                    <TextInput
                        ref={number_input}
                        style={styles.inputContent}
                        placeholder="Número"
                        value={number}
                        onChangeText={(text) => setNumber(text)} />
                    <TextInput
                        style={styles.inputContent}
                        placeholder="Bairro"
                        value={district}
                        onChangeText={(text) => setDistrict(text)}
                        editable={false}
                        selectTextOnFocus={false} />
                    <TextInput
                        style={styles.inputContent}
                        placeholder="Cidade"
                        value={city}
                        onChangeText={(text) => setCity(text)}
                        editable={false}
                        selectTextOnFocus={false} />
                    <TextInput
                        style={styles.inputContent}
                        placeholder="Estado"
                        value={state}
                        onChangeText={(text) => setState(text)}
                        editable={false}
                        selectTextOnFocus={false} />

                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
                        <Text style={styles.textHeaderSpeciality}>
                            Informe sua principal Especialidade.
                        </Text>
                    </View>
                    <Text>Selecione a Categoria</Text>
                    <DropDownPicker
                        containerStyle={{ height: 60 }}
                        style={{ backgroundColor: '#FFFFFF'}}
                        itemStyle={{
                            justifyContent: 'flex-start',
                            paddingVertical: 10
                        }}
                        value={id_category}
                        onChangeItem={item => setId_Category(item.value)}
                        items={dataListCategories}
                    />                        
                    <View style={{ alignItems: 'center' }}>    
                        <Text style={styles.textHeaderUser}>
                            Registre seus dados de acesso
                        </Text>
                    </View>
                    <TextInput
                        ref={emailaddress_input}
                        style={styles.inputContent}
                        placeholder="Digite seu Email"
                        value={email_address}
                        onChangeText={(text) => setEmail_Address(text)}
                        onSubmitEditing={() => password_input.current.focus()}
                        blurOnSubmit={false}
                        returnKeyType="next"
                        autoCapitalize="none" />
                    <TextInput
                        ref={password_input}
                        style={styles.inputContent}
                        placeholder="Digite sua senha"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                    <View style={styles.user}>
                        <Text style={{ top: -25, fontSize: 19, fontWeight: 'bold' }}>
                        Selecione uma foto para o seu perfil
                        </Text>
                        <Image source={photo_profile == '' ? require('../../assets/user2.jpg') : { uri: photo_profile }} style={styles.imageUser} />
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
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.buttonFooter}
                    onPress={saveProvider}>
                    <Text style={styles.textButtonContent}>
                        Cadastrar
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}