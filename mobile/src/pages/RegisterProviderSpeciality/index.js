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
    
    const categoryRef = useRef();

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

        console.log(id_category);

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
                <Text>
                    Informe sua(s) Especialidade(s)
                </Text>
                <Text>Selecione a Categoria</Text>
                <RNPickerSelect
                    ref={categoryRef}
                    onValueChange={(value) => loadSpecialities(value)}
                    items={dataListCategories}
                />
                <Text>Selecione a Especialidade</Text>
                <RNPickerSelect
                    style={styles.select}
                    onValueChange={(value) => console.log(value)}
                    items={dataListSpecialities}
                />
            </View>
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.buttonRegister}>
                            <Text style={styles.textButtonContent}>
                                Cadastrar
                            </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}