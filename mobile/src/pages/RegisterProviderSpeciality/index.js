import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import RNPickerSelect from 'react-native-picker-select';

import styles from './style';

import api from '../../services/api';

export default function RegisterProviderSpeciality() {
    
    const[loading, setLoading] = useState(false);
    const[categories, setCategories] = useState([]);
    const[specialities, setSpecialities] = useState([]);
    const[id_category, setId_Category] = useState('');
    const[id_speciality, setId_Speciality] = useState('');    
    const navigation = useNavigation();
    const route = useRoute();

    const id_provider = route.params.idprovider;

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
            Alert.alert(error);
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
            Alert.alert(error);
        });
    }

    async function hangleRegiter() {

        const data = {
            id_provider,
            id_category,
            id_speciality
        }

        if (id_category == '') {
            Alert.alert("Selecione sua(s) Categoria(s)");
        } else if (id_speciality == '') {
            Alert.alert('Selecione sua(s) Especiadade(s)')
        }
        setLoading(true);
        await api.post('provider_category_speciality', data)
        .then(() => {
            Alert.alert("Cadastro reaalizado com sucesso.");
            setLoading(false);
            navigation.navigate('Localization');
        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
        })

        console.log(id_category);
        console.log(id_speciality);
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

    return (
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Carregando...'}
                textStyle={styles.spinnerTextStyle}/>
            <View style={styles.header}>
                <Text style={styles.textHeader}>
                    Informe sua(s) Especialidade(s)
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
            </View>
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={hangleRegiter}>
                            <Text style={styles.textButtonContent}>
                                Gravar Informações
                            </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}