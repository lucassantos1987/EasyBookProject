import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import PasswordInputText from 'react-native-hide-show-password-input';

import styles from './style';

import user from '../../assets/user2.jpg';
import style from './style';

import api from '../../services/api';

const i_cep = require('awesome-cep');

export default function Register() {

    const[name, setName] = useState('');
    const[whatsapp, setWhatsapp] = useState('');
    const[zip_code, setZip_Code] = useState('');
    const[address, setAddress] = useState('');
    const[number, setNumber] = useState('');
    const[complement, setComplement] = useState('');
    const[district, setDistrict] = useState('');
    const[city, setCity] = useState('');
    const[state, setState] = useState('');
    const[email, setEmail] = useState('');
    const[obs, setObs] = useState('');
    const[photo, setPhoto] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassWord, setConfirmPassWord] = useState('');
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
            address,
            number,
            complement,
            district,
            city,
            state,
            zip_code,            
            email,
            whatsapp,
            obs,
            photo,
            username,
            password
        };

        setLoading(true);
        await api.post('provider', data)
        .then(() => {
            Alert.alert("Cadastro realizado com sucesso.");
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            Alert.alert(error.message);
        })
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
                        placeholder="WhatsApp +55 DDD 999999999"
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
                    <View style={{ top: 100}}>
                        <Text style={{ fontSize: 18 }}>
                            Registre seus dados de acesso
                        </Text>
                        <TextInput
                            style={styles.inputContent}
                            placeholder="Digite seu nome de usuário"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                            autoCapitalize="none"/>
                        <PasswordInputText
                            placeholder="Digite sua senha"
                            value={password}
                            onChangeText={ (text) => setPassword(text) }/>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonRegister}
                        onPress={handleRegister}>
                        <Text style={styles.textButtonContent}>
                            Cadastrar
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}