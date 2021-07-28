import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../../services/api';

import styles from './styles';

export default function Category() {

    const [categories, setCategories] = useState([]);
    const [filterName, setFilterName] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    function navigateToSpeciality(category) {
        navigation.navigate('RequestProvider', { category });
    }

    async function loadCategories() {
        setLoading(true);
        await api.get('category')
            .then(response => {
                setCategories(response.data);
                setFilterName(response.data);
                setLoading(false);
            })
            .catch(error => {
                Alert.alert(error);
            });
    }

    useEffect(() => {
        loadCategories();
    }, []);

    function filterCategories(text) {
        var newData = categories.filter(item => {
            var itemData = `${item.id} ${item.name}`;
            var textData = text;
            return itemData.indexOf(textData) > -1;
        });

        if (text !== '') {
            setCategories(newData);
        } else {
            setCategories(filterName);
        }
    }

    return (
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Carregando Categorias...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.header}>
                <TouchableOpacity style={styles.buttonHeaderBack}
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={26} color="#FFFFFF"/>
                </TouchableOpacity>
                <Text style={styles.textHeader}>Selecione a Categoria</Text>
            </View>
            <TextInput
                    style={styles.inputSearch}
                    onChangeText={(text) => filterCategories(text)}
                    placeholder="Digite aqui para pesquisar a categoria..." />

            <FlatList
                style={styles.listCategory}
                data={categories}
                keyExtractor={category => String(category.id)}
                renderItem={({ item: category }) => (
                    <ListItem onPress={() => navigateToSpeciality(category.id)}>
                        <ListItem.Content>
                            <ListItem.Title>
                                {category.name}
                            </ListItem.Title>
                            <ListItem.Subtitle
                                style={{ color: "#95a5a6"}}>
                                {"Clique para ver os profissionais"}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
        </View>
    );
}