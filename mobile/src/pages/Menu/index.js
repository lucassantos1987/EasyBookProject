import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage  from '@react-native-community/async-storage';
import { ConfirmDialog } from 'react-native-simple-dialogs';

import api from '../../services/api';
import user from '../../assets/user2.jpg';
import styles from './style';

export default function Menu() {

    //const[id_provider, setId_Provider] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[name, setName] = useState('');
    const[photo, setPhoto] = useState('');
    const[loading, setLoading] = useState(false);
    const[dialog_visible, setDialog_Visible] = useState(false);
    const[msg_loading, setMsg_Loading] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        loadInfoProviderLoginUser();
    }, []);

    async function loadInfoProviderLoginUser() {
        setLoading(true);
        
        const id_provider  = await AsyncStorage.getItem('id_provider');
        setEmail(await AsyncStorage.getItem('email'));
        setPassword(await AsyncStorage.getItem('password'));

        setMsg_Loading("Carregando dados...");

        await api.get('provider', { params: { id_provider: id_provider }})
        .then(response => {
            setLoading(false);
            var dataS = JSON.stringify(response.data);
            var dataP = JSON.parse(dataS);
            var data = dataP[0];
    
            setName(data.name + " " + data.last_name);
            setPhoto('http://192.168.0.108:3333/photosprofileeasybook/resized/' + data.photo);
        }).catch(error => {
            setLoading(false);
            Alert.alert(error);
        })
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

    return(
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={msg_loading}
                style={styles.spinnerTextStyle}
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
            <View style={styles.menu}>
                <View style={styles.user}>
                    <Image 
                        source={ photo == '' ? require('../../assets/user2.jpg') : { uri: photo }} 
                        style={styles.imageUser}/>
                    <Text style={styles.textUser}>{ name }</Text>
                </View>    
            </View>
            <View style={styles.containerMenuButtons}>
                <TouchableOpacity style={styles.buttonMenuMyData}>
                    <Text style={styles.textButtonMenu}>Meus Dados</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMenuMySpeciality}>
                    <Text style={styles.textButtonMenu}>Minhas Especialidades</Text>
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