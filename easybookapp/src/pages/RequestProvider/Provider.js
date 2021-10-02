import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import api from '../../services/api';

export default function Provider() {

    const [providers, setProviders] = useState([]);
    const [whatsApp, setWhatsApp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    const id_category = route.params.category
    
    const url = "http://192.168.0.109:3333";

    async function loadProviders() {
        setLoading(true);
        await api.get('provider_category', { params: { id_category: id_category } })
            .then(response => {
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

    function navigateToInfoProvider(provider) {
        navigation.navigate('InfoProvider', { provider });
    }

    function filterProviders(text) {
        const newData = providers.filter(item => {
            const itemData = `${item.id} ${item.name}`;
            const textData = text;
            return itemData.indexOf(textData) > -1;
        });

        if (text !== '') {
            setProviders(newData);
        } else {
            loadProviders();
        }
    }

    return (
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Carregando Profissionais...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.header}>
                <TouchableOpacity style={styles.buttonHeaderBack}
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={26} color="#FFFFFF"/>
                </TouchableOpacity>
                <Text style={styles.textHeader}>Selecione a Profissional</Text>
            </View>
            <TextInput
                    style={styles.inputSearch}
                    placeholder="Digite aqui para pesquisar..."
                    onChangeText={(text) => filterProviders(text)} />
            <FlatList
                style={styles.listCategory}
                data={providers}
                keyExtractor={provider => String(provider.id)}
                ItemSeparatorComponent={() => {
                    return (<View style={{ height: 1, backgroundColor: "#dfe6e9"}}></View>)
                }}
                renderItem={({ item: provider }) => (
                    <ListItem onPress={() => navigateToInfoProvider(provider.id)}>
                        <Avatar
                            size={"large"}
                            rounded={true}
                            source={{ uri: url + "/photosprofileeasybook/resized/" + provider.photo }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>
                                {provider.name + " " + provider.last_name}
                            </ListItem.Title>
                            <ListItem.Subtitle
                                style={{ color: "#95a5a6"}}>
                                {"Clique para mais informações"}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
        </View>
    );
}