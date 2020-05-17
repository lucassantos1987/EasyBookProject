import React from 'react';
import { Feather }  from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import styles from './styles';
import image from '../../assets/user2.jpg';

export default function Category() {

    const navigation = useNavigation();

    function navigateToSpeciality() {
        navigation.navigate();
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Selecione a Profissional</Text>
            </View>
            <FlatList
                style={styles.listCategory}
                data={[1, 2, 3, 4, 5, 6]}
                keyExtractor={category => String(category)}
                renderItem={() => (
                    <View style={styles.provider}>
                        <Image source={image} style={styles.imageProvider}/>
                        <Text style={styles.textProvider}>Profissional</Text>
                        <TouchableOpacity
                            style={styles.buttonChat}>
                            <Text style={styles.textButtonChat}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonInfo}>
                            <Text style={styles.textButtonInfo}>Informações</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}