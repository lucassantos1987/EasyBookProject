import React, { useState, useEffect } from 'react';
import { Feather }  from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';
import api from '../../services/api';

export default function Speciality() {

    const[specialities, setSpecialities] = useState([]);
    const[loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    const id_category = route.params.category;

    console.log(id_category);

    function navigateToProvider(category, speciality) {
        navigation.navigate('RequestProvider', { 
            category, 
            speciality,
        });
    }

    async function loadSpecialities() {
        setLoading(true);
        await api.get('speciality', { params: { id_category: id_category } })
        .then(response => {
            setSpecialities(response.data);
            setLoading(false);    
        })
        .catch(error => {
            setLoading(false);
            Alert.alert(error);
        });
    }

    useEffect(() => {
        loadSpecialities();
    }, []);

    function filterSpecialities(text) {
        const newData = specialities.filter(item => {
            const itemData = `${item.id} ${item.name}`;
            const textData= text;
            return itemData.indexOf(textData) > -1;
        });

        if (text !== '') {
            setSpecialities(newData);
        } else {
            loadSpecialities();
        }
    }

    return(
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Carregando Especialidades...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.header}>
                <Text style={styles.textHeader}>Selecione a Especialidade</Text>
                <TextInput
                    style={styles.inputSearch}
                    onChangeText={(text) => filterSpecialities(text)}
                    placeholder="Digite aqui para pesquisar a especialidade..."/>
            </View>
            <FlatList
                style={styles.listCategory}
                data={specialities}
                keyExtractor={speciality => String(speciality.id)}
                renderItem={({ item: speciality }) => (
                    <ListItem onPress={() => navigateToProvider(speciality.id_category, speciality.id)}>
                        <ListItem.Content>
                            <ListItem.Title>                                
                                { speciality.name }
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                { "Clique para ver os profissionais" }
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
        </View>
    );
}