import React from 'react';
import { Feather }  from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import styles from './styles';

export default function Category() {

    const navigation = useNavigation();

    function navigateToProvider() {
        navigation.navigate('RequestProvider');
    }

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
                data={[1, 2, 3, 4, 5, 6]}
                keyExtractor={category => String(category)}
                renderItem={() => (
                    <View style={styles.category}>
                        <Text style={styles.textCategory}>Especialidade</Text>
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