import React, { useState, useEffect } from 'react';
import { Feather }  from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import api from '../../services/api';

export default function Speciality() {

    const[specialities, setSpecialities] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();

    const id_category = route.params.category;

    console.log(id_category);

    function navigateToProvider() {
        navigation.navigate('RequestProvider');
    }

    async function loadSpecialities() {
        const response = await api.get('speciality', { params: { id_category: id_category } });
        setSpecialities(response.data);
    }

    useEffect(() => {
        loadSpecialities();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Selecione a Especialidade</Text>
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Digite aqui para pesquisar..."/>
            </View>
            <FlatList
                style={styles.listCategory}
                data={specialities}
                keyExtractor={speciality => String(speciality.id)}
                renderItem={({ item: speciality }) => (
                    <View style={styles.category}>
                        <Text style={styles.textCategory}>{speciality.name}</Text>
                        <Text style={styles.textCount}>1 profissional encontrado</Text>
                        <TouchableOpacity
                            style={styles.buttonDetails}
                            onPress={navigateToProvider}>
                            <Text style={styles.textButtonDetails}>Ver Profissionais</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}