import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConfirmDialog } from 'react-native-simple-dialogs';

import styles from './style';
import api from '../../services/api';

export default function DataCustomer() {
    const [first_name, setName] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg_loading, setMsg_Loading] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dialog_visible, setDialog_Visible] = useState(false);

    const lastname_input = useRef();
    const whatsapp_input = useRef();

    const navigation = useNavigation();

    useEffect(() => {
        loadDataCustomer();
    }, []);

    async function loadDataCustomer() {
        setLoading(true);

        const id_customer = await AsyncStorage.getItem('id_customer');
        setEmail(await AsyncStorage.getItem('email'));
        setPassword(await AsyncStorage.getItem('password'));

        setMsg_Loading("Carregando dados...");

        await api.get('customer', { params: { id_customer: id_customer } })
            .then(response => {
                setLoading(false);
                var dataS = JSON.stringify(response.data);
                var dataP = JSON.parse(dataS);
                var data = dataP[0];

                setName(data.first_name);
                setLast_Name(data.last_name);
                setWhatsapp(data.whatsapp);
            }).catch(error => {
                setLoading(false);
                Alert.alert(error);
            })
    }

    function confirmUhandleRegister() {
        setDialog_Visible(true);
    }

    async function handleRegister() {
        setLoading(true);
        const id = await AsyncStorage.getItem('id_customer');
        const data = {
            id,
            first_name,
            last_name,
            whatsapp
        };

        if (first_name.trim() == '') {
            Alert.alert("Digite seu Nome");
        } else if (last_name.trim() == '') {
            Alert.alert("Digite seu Sobrenome");
        } else if (whatsapp.trim() == '') {
            Alert.alert("Digite seu número do WhatsApp");
        } else {
            await api.post('customer_update', data)
                .then(function () {
                    setLoading(false);
                    setDialog_Visible(false);
                    Alert.alert("Dados alterados com sucesso.");
                }).catch(function (error) {
                    setLoading(false);
                    setDialog_Visible(false);
                    Alert.alert(error.message);
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
                        value={first_name}
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