import React, { useRef, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Avatar } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';
import DropDownPicker from 'react-native-dropdown-picker';

import api from '../../services/api';
import styles from './style';

export default function CategorySpecialityProvider() {

    const [categories_specialities, setCategories_specialities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [specialities, setSpecialities] = useState([]);
    const [id_category, setId_Category] = useState('');
    const [id_speciality, setId_Speciality] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg_loading, setMsg_Loading] = useState('Carregando Minhas Especialidades...');

    const bottom_sheet = useRef();

    const navigation = useNavigation();

    useEffect(() => {
        loadCategoriesSpecialities();
        loadCategories();
        loadSpecialities();
    }, []);

    async function loadCategories() {
        setLoading(true);
        await api.get('category')
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                Alert.alert(error.message);
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
                setLoading(false);
                Alert.alert(error.message);
            });
    }

    async function loadCategoriesSpecialities() {
        setLoading(true);
        setMsg_Loading("Carregando Especialidades...");
        const id_provider = await AsyncStorage.getItem('id_provider');

        await api('provider_category_speciality_list', { params: { id_provider: id_provider } })
            .then(response => {
                setLoading(false);
                setCategories_specialities(response.data);
            })
            .catch(error => {
                setLoading(false);
                Alert.alert(error.message);
            })
    }

    async function handleRegisterCategorySpeciality() {
        setLoading(true);
        setMsg_Loading("Salvando...");
        const id_provider = await AsyncStorage.getItem('id_provider');
        const data = {
            id_provider,
            id_category,
            id_speciality
        };

        if (id_category == '') {
            Alert.alert("Selecione sua(s) Categoria(s)");
        } else if (id_speciality == '') {
            Alert.alert('Selecione sua(s) Especiadade(s)');
        } else {

            await api.post('provider_category_speciality', data)
            .then(function (response) {
                Alert.alert(response.data.res);
                setLoading(false);
                bottom_sheet.current.close();
                loadCategoriesSpecialities();                
            }).catch(function (error) {
                Alert.alert("Não foi possível gravar a especialidade. Tente novamente." + error.message);
                setLoading(false);                
            });

        }        
    }

    function showAddCategorySpeciality() {
        bottom_sheet.current.open();
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
                textStyle={styles.spinnerTextStyle}
                visible={loading}
                textContent={msg_loading}
            />
            <RBSheet
                ref={bottom_sheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={280}>

                <View style={{ padding: 20 }}>

                    <Text>Selecione a Categoria</Text>

                    <DropDownPicker
                        containerStyle={{ height: 60 }}
                        style={{ backgroundColor: '#FFFFFF'}}
                        itemStyle={{
                            justifyContent: 'flex-start',
                            paddingVertical: 10
                        }}
                        value={id_category}
                        onChangeItem={item => loadSpecialities(item.value)}
                        items={dataListCategories}
                    />
                    <Text>Selecione a Especialidade</Text>
                    <DropDownPicker 
                        containerStyle={{ height: 60 }}
                        style={{ backgroundColor: '#FFFFFF'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        value={id_speciality}
                        onChangeItem={item => setId_Speciality(item.value)}
                        items={dataListSpecialities}
                    />
                </View>
                <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.buttonFooter}
                    onPress={handleRegisterCategorySpeciality}>
                    <Text 
                        style={styles.textButtonContent}>
                        Gravar
                    </Text>
                </TouchableOpacity>
            </View>

            </RBSheet>

            <View style={styles.header}>
                <Text style={styles.textHeader}>Minhas Especialidades</Text>
            </View>
            <FlatList
                style={styles.list}
                data={categories_specialities}
                keyExtractor={category_speciality => String(category_speciality.id_category + category_speciality.id_speciality)}
                renderItem={({ item: category_speciality }) => (
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>
                                {category_speciality.name_category}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                {category_speciality.name_speciality}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.buttonFooter}>
                    <Text 
                        style={styles.textButtonContent}
                        onPress={showAddCategorySpeciality}>
                        Adicionar Especialidade
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}