import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Image, Alert, DevSettings } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import PasswordInputText from 'react-native-hide-show-password-input';
import RNPickerSelect from 'react-native-picker-select';

import styles from './style';
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
    //const[photo, setPhoto, getPhoto] = useState('');
    const[image, setImage] = useState('');
    const[categories, setCategories] = useState([]);
    const[specialities, setSpecialities] = useState([]);
    const[id_category, setId_Category] = useState('');
    const[id_speciality, setId_Speciality] = useState('');    
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[loading, setLoading] = useState(false);
    //const[success_upload, setSuccess_upload, getSuccess_upload] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        loadCategories();
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

    async function loadSpecialities(value) {        
        const id_category = value;
        setId_Category(value);

        setLoading(true);
        await api.get('speciality', { params: { id_category: id_category } })
        .then(response => {
            setSpecialities(response.data);
            setLoading(false);    
        })
        .catch(error => {
            setLoading(false);
            Alert.alert(error.message);
        });
    }

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

    async function handleRegister() {
        
        setLoading(true);
        var photo = "";
        var success_upload = false;

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

        await fetch('http://192.168.0.108:3333/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        .then(response => response.json())
        .then(file => {
            photo = file.file;
            success_upload = file.success
        })
        .catch(error => {
            success_upload = false;
            console.log(error.message);
        });

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
            id_category,
            id_speciality,
            username,
            email,
            password
        };        
        
        if (success_upload) {
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
            } else if (image == '') {
                Alert.alert("Selecione sua Foto");
            } else if (id_category == '') {
                Alert.alert("Selecione sua(s) Categoria(s)");
            } else if (id_speciality == '') {
                Alert.alert('Selecione sua(s) Especiadade(s)');
            } else if (username.trim() == '') {
                Alert.alert('Digite seu Nome de Usuário');
            } else if (email.trim() == '') {
                Alert.alert("Digite seu Email");
            } else if (password.trim() == '') {
                Alert.alert("Digite sua Senha");
            } else {
                await api.post('provider', data)
                .then(function(response) {
                    console.log(response.data.result[0]);
                    setLoading(false);
                    Alert.alert("Cadastro realizado com sucesso.");
                    navigation.navigate('Localization');
                }).catch(function(error) {
                    setLoading(false);
                    Alert.alert("Não foi possível realizar o cadastro. Tente novamente." + error.message);
                });    
            }
        } else {
            Alert.alert("Não foi possível realizar o cadastro. Tente novamente.")
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

    const dataListCategories = categories.map(item => ({
        label: item.name,
        value: item.id,
        key: item.id
    }))

    const dataListSpecialities = specialities.map(item => ({
        label: item.name,
        value: item.id,
        key: item.id
    }))

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
                        <Image source={ image == '' ? require('../../assets/user2.jpg') : { uri: image }} style={styles.imageUser}/>
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

                    <Text style={styles.textHeaderSpeciality}>
                        Informe sua principal Especialidade.
                    </Text>
                    <Text>Selecione a Categoria</Text>
                    <RNPickerSelect
                        onValueChange={(value) => loadSpecialities(value)}
                        items={dataListCategories}
                    />
                    <Text>Selecione a Especialidade</Text>
                    <RNPickerSelect
                        style={styles.select}
                        onValueChange={(value) => setId_Speciality(value)}
                        items={dataListSpecialities}
                    />

                    <Text style={styles.textHeaderUser}>
                        Registre seus dados de acesso
                    </Text>
                    <TextInput
                        style={styles.inputContent}
                        placeholder="Digite seu nome de usuário"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        autoCapitalize="none"/>
                    <TextInput
                        style={styles.inputContent}
                        placeholder="Digite seu Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize="none"/>
                    <PasswordInputText
                        placeholder="Digite sua senha"
                        value={password}
                        onChangeText={ (text) => setPassword(text) }
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

        </View>
    );
}