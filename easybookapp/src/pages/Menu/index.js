import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import * as ImagePicker from 'expo-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';

import api from '../../services/api';
import styles from './style';

export default function Menu() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [originalPhoto, setOriginalPhoto] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [dialog_visible, setDialog_Visible] = useState(false);
    const [msg_loading, setMsg_Loading] = useState('');

    const bottom_sheet = useRef();

    const navigation = useNavigation();

    useEffect(() => {
        loadInfoProviderLoginUser();
    }, []);

    async function loadInfoProviderLoginUser() {
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

                setName(data.name + " " + data.last_name);
                setImage('http://192.168.0.109:3333/photosprofileeasybook/resized/' + data.photo);
                setOriginalPhoto('http://192.168.0.109:3333/photosprofileeasybook/resized/' + data.photo);
            }).catch(error => {
                setLoading(false);
                Alert.alert(error);
            })
    }

    function navigateToDataProvider() {
        navigation.navigate('DataProvider');
    }

    function showOptionsPhoto() {
        bottom_sheet.current.open();
    }

    function confirmLogout() {
        setDialog_Visible(true);
    }

    async function logout() {
        setLoading(true);
        setMsg_Loading("Saindo...");
        await AsyncStorage.removeItem('id_provider');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
        setLoading(false);
        setDialog_Visible(false);
        navigation.navigate('Login');
    }

    function navigateToLocalization() {
        navigation.navigate('Localization');
    }

    async function _pickImage() {
        var success = false;
        var photo = "";
        var selectedImage = "";
        var success_upload = false;

        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        })
            .then((response) => {
                if (!response.cancelled) {
                    setImage(response.uri);
                    selectedImage = response.uri;
                    success = true;
                }
            })
            .catch(error => {
                console.log(error.message);
                success = false;
            });

        if (success) {
            let localUri = selectedImage;
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

            await fetch('http://192.168.0.109:3333/photosprofileeasybook', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })
                .then(response => response.json())
                .then(file => {
                    Alert.alert("Foto alterada com sucesso");
                    setLoading(false);
                    photo = file.file;
                    success_upload = file.success;
                })
                .catch(error => {
                    Alert.alert("Não foi possível alterar foto");
                    setLoading(false);
                    success_upload = false;
                    console.log(error.message);
                    Alert.alert(error.message);
                    setImage(originalPhoto);
                });

            if (success_upload) {

                const id = await AsyncStorage.getItem('id_provider');
                const data = {
                    id,
                    photo
                };

                await api.post('provider_update_photo', data)
                    .then(function () {
                        setLoading(false);
                        setDialog_Visible(false);
                    }).catch(function (error) {
                        setLoading(false);
                        setDialog_Visible(false);
                        Alert.alert(error.message);
                    });
            }

            setLoading(false);

        } else {
            Alert.alert("Não foi possível alterar foto");
            setLoading(false);
            setImage(originalPhoto);
        }
    }

    async function _takePhtoPickImage() {
        var success = false;
        var photo = "";
        var selectedImage = "";
        var success_upload = false;

        await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1
        })
            .then((response) => {
                if (!response.cancelled) {
                    setImage(response.uri);
                    selectedImage = response.uri;
                    success = true;
                }
            })
            .catch(error => {
                console.log(error.message);
            });

        if (success) {
            let localUri = selectedImage;
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

            await fetch('http://192.168.0.109:3333/photosprofileeasybook', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })
                .then(response => response.json())
                .then(file => {
                    Alert.alert("Foto alterada com sucesso");
                    setLoading(false);
                    photo = file.file;
                    success_upload = file.success;
                })
                .catch(error => {
                    Alert.alert("Não foi possível alterar foto");
                    setLoading(false);
                    success_upload = false;
                    console.log(error.message);
                    setImage(originalPhoto);
                });

            if (success_upload) {

                const id = await AsyncStorage.getItem('id_provider');
                const data = {
                    id,
                    photo
                };

                await api.post('provider_update_photo', data)
                    .then(function () {
                        setLoading(false);
                        setDialog_Visible(false);
                    }).catch(function (error) {
                        setLoading(false);
                        setDialog_Visible(false);
                    });
            }

            setLoading(false);

        } else {
            Alert.alert("Não foi possível alterar foto");
            setLoading(false);
            setImage(originalPhoto);
        }
    }

    return (
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={msg_loading}
                textStyle={styles.spinnerTextStyle}
            />
            <ConfirmDialog
                title="Confirmação"
                message="Tem certeza que deseja fazer Sair?"
                visible={dialog_visible}
                onTouchOutside={() => setDialog_Visible(false)}
                positiveButton={{
                    title: "SIM",
                    onPress: () => logout()
                }}
                negativeButton={{
                    title: "NÃO",
                    onPress: () => setDialog_Visible(false)
                }}
            />
            <RBSheet
                ref={bottom_sheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={200}>

                <View style={{ padding: 20, flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={_pickImage}>
                        <Image source={require('../../assets/gallery.png')}
                            style={styles.optionImage1} />
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#A0A0A0', top: 5, left: 15 }}>Galeria de Imagens</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 15, flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={_takePhtoPickImage}>
                        <Image source={require('../../assets/camera.png')}
                            style={styles.optionImage2} />
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#A0A0A0', top: 15, left: 10 }}>Tirar Foto</Text>
                    </TouchableOpacity>
                </View>

            </RBSheet>
            <View style={styles.menu}>
                <View style={styles.user}>
                    <Image
                        source={image == '' ? require('../../assets/user2.jpg') : { uri: image }}
                        style={styles.imageUser} />
                    <Text style={styles.textUser}>{name}</Text>
                </View>
            </View>
            <View style={styles.containerMenuButtons}>
            <TouchableOpacity
                    style={styles.buttonMenuMySpeciality}>
                    <Text style={styles.textButtonMenu}>Minhas Especialidades</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonMenuMyData}
                    onPress={navigateToDataProvider}>
                    <Text style={styles.textButtonMenu}>Meus Dados</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonMenuMyPhoto}
                    onPress={showOptionsPhoto}>
                    <Text style={styles.textButtonMenu}>Alterar Minha Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={confirmLogout}
                    style={styles.buttonMenuLogout}>
                    <Text style={styles.textButtonMenu}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}