import React, { useState, useEffect } from 'react';
import { Feather }  from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import styles from './styles';

export default function Category() {

    const[categories, setCategories] = useState([]);

    const navigation = useNavigation();

    function navigateToSpeciality(category) {
        navigation.navigate('RequestSpeciality', { category });
    }

    async function loadCategories() {
        const response = await api.get('category');
        setCategories(response.data);
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Selecione a Categoria</Text>
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Digite aqui para pesquisar..."/>
            </View>
            <FlatList
                style={styles.listCategory}
                data={categories}
                keyExtractor={category => String(category.id)}
                renderItem={({ item: category }) => (
                    <View style={styles.category}>
                        <Text style={styles.textCategory}>{category.name}</Text>
                        <TouchableOpacity
                            style={styles.buttonDetails}
                            onPress={() => navigateToSpeciality(category.id)}>
                            <Text style={styles.textButtonDetails}>Ver Especialidades</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}