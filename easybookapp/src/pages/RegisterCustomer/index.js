import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Image, Alert, DevSettings, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';

import styles from './style';
import api from '../../services/api';
const i_cep = require('awesome-cep');

export default function Register() {
    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [prefix_whatsapp, setPrefix_WhatsApp] = useState('+55');
    const [obs, setObs] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg_loading, setMsg_Loading] = useState('');
    const navigation = useNavigation();

    const lastname_input = useRef();
    const whatsapp_input = useRef();
    const email_input = useRef();
    const password_input = useRef();

    useEffect(() => {
        setMsg_Loading("Carregando...");
    }, []);

    async function handleRegister() {
        setLoading(true);
        var photo = "";
        var success_upload = false;

        if (image != '') {

            setMsg_Loading("Salvando foto...");

            let localUri = image;
            let filename = localUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let typefile = match ? `image/${match[1]}` : `image`;

            // Upload the image using the fetch and FormData APIs
            let formData = new FormData();
            // Assume "photo" is the name of the form field the server expects
            formData.append('name', 'avatar');
            formData.append('image', {
                uri: localUri,
                type: typefile,
                name: filename
            });

            await fetch('http://192.168.0.105:3333/photosprofileeasybook', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })
                .then(response => response.json())
                .then(file => {
                    setLoading(false);
                    photo = file.file;
                    success_upload = file.success
                })
                .catch(error => {
                    setLoading(false);
                    success_upload = false;
                    console.log(error.message);
                });
        }

        const data = {
            first_name,
            last_name,
            whatsapp,
            photo,
            email,
            password
        };

        if (success_upload) {

            setLoading(true);

            if (first_name.trim() == '') {
                Alert.alert("Digite seu Nome");
            } else if (last_name.trim() == '') {
                Alert.alert("Digite seu Sobrenome");
            } else if (whatsapp.trim() == '') {
                Alert.alert("Digite seu número do WhatsApp");
            } else if (image == '') {
                Alert.alert("Selecione sua Foto");
            } else if (email.trim() == '') {
                Alert.alert("Digite seu Email");
            } else if (password.trim() == '') {
                Alert.alert("Digite sua Senha");
            } else {

                await api.post('customer', data)
                    .then(function (response) {
                        setLoading(false);
                        Alert.alert(response.data.res);
                    }).catch(function (error) {
                        setLoading(false);
                        Alert.alert("Não foi possível realizar o cadastro. Tente novamente." + error.message);
                    });
            }
        } else {
            setLoading(false);
            Alert.alert("Não foi possível realizar o cadastro.")
        }
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
                    setImage(response.uri);
                    console.log(image);
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
                    setImage(response.uri);
                    console.log(image);
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
                        onSubmitEditing={() => zipcode_input.current.focus()}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        keyboardType={'numeric'} />
                    <View style={styles.user}>
                        <Text style={{ top: -20, fontSize: 18 }}>
                            Agora selecione uma foto para o seu perfil.
                        </Text>
                        <Image source={image == '' ? require('../../assets/user2.jpg') : { uri: image }} style={styles.imageUser} />
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
                    <Text style={styles.textHeaderUser}>
                        Registre seus dados de acesso
                    </Text>
                    <TextInput
                        ref={email_input}
                        style={styles.inputContent}
                        placeholder="Digite seu Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
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
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.buttonFooter}
                    onPress={handleRegister}>
                    <Text style={styles.textButtonContent}>
                        Cadastrar
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}