import React, { useState, useEffect } from 'react';
import { Feather }  from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
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
            await api.get('category')
            .then(response => {
                setCategories(response.data);
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
                textContent={'Carregando Categorias...'}
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
                    <ListItem onPress={() => navigateToSpeciality(category.id)}>
                        <ListItem.Content>
                            <ListItem.Title>                                
                                { category.name }
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                { "Clique para ver as especialidades" }
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
        </View>
    );
}