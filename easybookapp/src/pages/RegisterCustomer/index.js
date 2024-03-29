import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Image, Alert, DevSettings, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style';
import api from '../../services/api';
const i_uploadPhoto = require('../../services/uploadPhoto');
const i_sendEmail = require('../../services/send-email');

export default function RegisterCustomer() {
    
    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [photo_profile, setPhoto_Profile] = useState('');
    const [email_address, setEmail_Address] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg_loading, setMsg_Loading] = useState('');
    const navigation = useNavigation();

    const lastname_input = useRef();
    const whatsapp_input = useRef();
    const emailaddress_input = useRef();
    const password_input = useRef();

    useEffect(() => {
        setMsg_Loading("Carregando...");
    }, []);

    async function saveCustomer() {
        var photo = '';
        
        i_uploadPhoto.uploadPhotoProfile(photo_profile)
        .then(response => {
        
            photo = response;   

            const data = {
                first_name,
                last_name,
                whatsapp,
                email_address,
                password,
                photo
            }
        
            setLoading(true);            
            setMsg_Loading("Salvando dados...");
        
            api.post('customer', data)
            .then(function (response) {
                setLoading(false);
                Alert.alert(response.data.message);
                i_sendEmail.sendEmailConfirmation(email_address);
                navigation.goBack();
            })
            .catch(function (error) {
                setLoading(false);
                console.log("error: " + error.message);
                Alert.alert(error.message + ". Não foi possível realizar o cadastro. Tente novamente.");
            });                        
        })
        .catch(error => {
            Alert.alert(error.message);
        });
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
                        value={first_name}
                        onChangeText={(text) => setFirst_Name(text)}
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
                        onSubmitEditing={() => emailaddress_input.current.focus()}
                        blurOnSubmit={false}                        
                        keyboardType={'numeric'}
                        returnKeyType="next" />

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
                        <Text style={{ top: -20, fontSize: 19, fontWeight: 'bold' }}>
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
                    onPress={saveCustomer}>
                    <Text style={styles.textButtonContent}>
                        Cadastrar
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}