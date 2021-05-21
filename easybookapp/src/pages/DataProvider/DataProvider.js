import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Image, Alert, DevSettings, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConfirmDialog } from 'react-native-simple-dialogs';

import styles from './style';
import api from '../../services/api';

const i_cep = require('awesome-cep');

export default function DataProvider() {
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
    const [loading, setLoading] = useState(false);
    const [msg_loading, setMsg_Loading] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dialog_visible, setDialog_Visible] = useState(false);

    const lastname_input = useRef();
    const whatsapp_input = useRef();
    const zipcode_input = useRef();
    const number_input = useRef();

    const navigation = useNavigation();

    useEffect(() => {
        loadDataProvider();
    }, []);

    async function loadDataProvider() {
        setLoading(true);

        const id_provider = await AsyncStorage.getItem('id_provider');
        setEmail(await AsyncStorage.getItem('email'));
        setPassword(await AsyncStorage.getItem('password'));

        setMsg_Loading("Carregando dados...");

        await api.get('provider', { params: { id_provider: id_provider } })
            .then(response => {
                setLoading(false);
                var dataS = JSON.stringify(response.data);
                var dataP = JSON.parse(dataS);
                var data = dataP[0];

                setName(data.name);
                setLast_Name(data.last_name);
                setWhatsapp(data.whatsapp);
                setZip_Code(data.zip_code);
                setAddress(data.address);
                setNumber(data.number);
                setDistrict(data.district);
                setCity(data.city);
                setState(data.state);
                setObs(data.obs);
            }).catch(error => {
                setLoading(false);
                Alert.alert(error);
            })
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

    function confirmUhandleRegister() {
        setDialog_Visible(true);
    }

    async function handleRegister() {
        setLoading(true);
        const id = await AsyncStorage.getItem('id_provider');
        const data = {
            id,
            name,
            last_name,
            address,
            number,
            district,
            city,
            state,
            zip_code,
            whatsapp,
            latitude,
            longitude,
            obs
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
        } else {

            console.log('Aqui');

            await api.post('provider_update', data)
                .then(function () {
                    setLoading(false);
                    setDialog_Visible(false);
                    Alert.alert("Dados alterados com sucesso.");
                }).catch(function (error) {
                    setLoading(false);
                    setDialog_Visible(false);
                    Alert.alert("Não foi possível alterar seus dados. Tente novamente." + error.message);
                });
        }

    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Spinner
                visible={loading}
                textContent={msg_loading}
                textStyle={styles.spinnerTextStyle} />
            <ConfirmDialog
                title="Confirmação"
                message="Confirma a atualização do seu cadastro?"
                visible={dialog_visible}
                onTouchOutside={() => setDialog_Visible(false)}
                positiveButton={{
                    title: "SIM",
                    onPress: () => handleRegister()
                }}
                negativeButton={{
                    title: "NÃO",
                    onPress: () => setDialog_Visible(false)
                }}
            />
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Meus Dados</Text>
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
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.buttonFooter}
                    onPress={confirmUhandleRegister}>
                    <Text style={styles.textButtonContent}>
                        Atualizar Meus Dados
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}