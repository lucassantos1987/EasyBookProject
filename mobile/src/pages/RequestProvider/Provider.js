import React, { useState, useEffect } from 'react';
import { Feather }  from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, Linking, ImageSourcePropType } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';
import image from '../../assets/user2.jpg';
import api from '../../services/api';

export default function Provider() {

    const[providers, setProviders] = useState([]);
    const[whatsApp, setWhatsApp] = useState('');
    const[loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    const id_category = route.params.category
    const id_speciality = route.params.speciality;

    async function loadProviders() {
        setLoading(true);
        await api.get('provider_category_speciality', { params: { id_category: id_category, id_speciality: id_speciality } })
        .then(response => {
            console.log(response.data);
            setProviders(response.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            Alert.alert(error.message);
        })
    }

    useEffect(() => {
        loadProviders();
    }, []);

    function navigateToInfoProvider() {
        navigation.navigate('InfoProvider');
    }

    function whatsapp (text) {
        Linking.openURL(`https://api.whatsapp.com/send?phone=${text}`);
    }

    function filterProviders(text) {
        const newData = providers.filter(item => {
            const itemData = `${item.id} ${item.name}`;
            const textData= text;
            return itemData.indexOf(textData) > -1;
        });

        if (text !== '') {
            setProviders(newData);
        } else {
            loadProviders();
        }
    }

    async function getPhotoFromServer(photo) {
        console.log(photo.replace('/\\', '/'));
        return await fetch('http://192.168.0.108:3333/' + photo.replace('/\\', '/'), {
            method: "GET",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',                
            }
        });
    }

    return(
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Carregando Profissionais...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.header}>
                <Text style={styles.textHeader}>Selecione a Profissional</Text>
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Digite aqui para pesquisar..."
                    onChangeText={(text) => filterProviders(text)}/>
            </View>
            <FlatList
                style={styles.listCategory}
                data={providers}
                keyExtractor={ provider => String(provider)}
                renderItem={({ item: provider }) => (
                    <ListItem>
                        <Avatar 
                            size={"large"}
                            rounded={true}
                            source={{uri: "http://192.168.0.108:3333/" + provider.photo.replace('/\\', '/')}} 
                        />
                        <ListItem.Content>                            
                            <ListItem.Title>                                
                                { provider.name + " " + provider.last_name }
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                { "Clique para mais informações" }
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    
                )}
            />
        </View>
    );
}