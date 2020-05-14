import React from 'react';
import { Feather }  from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import styles from './styles';

export default function Category() {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Selecione a Categoria</Text>
            </View>
            <FlatList
                style={styles.listCategory}
                data={[1, 2, 3, 4, 5]}
                keyExtractor={category => String(category)}
                renderItem={() => (
                    <View style={styles.category}>
                        <Text style={styles.textCategory}>Categoria</Text>
                        <Text style={styles.textCount}>1 profissional encontrado</Text>
                        <TouchableOpacity
                            style={styles.buttonDetails}>
                            <Text style={styles.textButtonDetails}>Ver Profissionais</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}