import React, { useState, useEffect } from 'react';
import { Feather }  from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../../services/api';

import styles from './styles';

export default function Category() {

    const[categories, setCategories] = useState([]);
    const[filterName, setFilterName] = useState([]);
    const[loading, setLoading] = useState(false);
    const navigation = useNavigation();

    function navigateToSpeciality(category) {
        navigation.navigate('RequestSpeciality', { category });
    }

    async function loadCategories() {
        setLoading(true);
        const response = await api.get('category');
        setCategories(response.data);
        setLoading(false);
    }

    useEffect(() => {
        loadCategories();
    }, []);

    function filterCategories(text) {
        const newData = categories.filter(item => {
            const itemData = `${item.id} ${item.name}`;
            const textData= text;
            return itemData.indexOf(textData) > -1;
        });

        if (text !== '') {
            setCategories(newData);
        } else {
            loadCategories();
        }
    }

    return(
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Carregando...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.header}>
                <Text style={styles.textHeader}>Selecione a Categoria</Text>
                <TextInput
                    style={styles.inputSearch}
                    onChangeText={(text) => filterCategories(text)}
                    placeholder="Digite aqui para pesquisar a categoria..."/>
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