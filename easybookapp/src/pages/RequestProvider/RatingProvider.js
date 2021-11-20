import  React, {useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Rating } from 'react-native-ratings';

import styles from './stylesRatingProvider';
import api from '../../services/api';

export default function RatingProvider() {

    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        loadRatings();
    }, []);

    async function loadRatings() {
        setLoading(true);

        await api.get('rating_provider')
            .then(function(response) {
                setRatings(response.data);
                setLoading(false);
            })
            .catch(function(error) {
                Alert.alert(error.message);
                setLoading(false);
            });
    }

    return (
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Carregando Avaliações...'}
                textStyle={styles.spinnerTextStyle} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.buttonHeaderBack}
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={26} color="#9b59b6" />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Avaliações</Text>
            </View>
            <FlatList
                style={styles.listRating}
                data={ratings}
                keyExtractor={rating => String(rating.id)}
                ItemSeparatorComponent={() => {
                    return (<View style={{ height: 1, backgroundColor: "#dfe6e9"}}></View>)
                }}
                renderItem={({ item: rating }) => (
                    <ListItem>
                        <ListItem.Content>
                            <View style={styles.contentRating}>
                                <Rating
                                    imageSize={15}
                                    readonly
                                    fractions={1} 
                                    ratingCount={5} 
                                    startingValue={rating.rating}/>
                                <Text style={{ marginLeft: 15, color: '#7f8c8d'}}>{rating.date_rating}</Text>    
                            </View>
                            <View style={styles.contentUSer}>
                            <Text style={styles.nameUserText}>{rating.name_customer}</Text>
                            </View>
                            <ListItem.Title>
                                {rating.title_rating}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                {rating.description_rating}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}
            />            
            <View style={styles.rating}>
                <TouchableOpacity
                    style={styles.buttonRating}>
                    <Text style={styles.textButtonRating}>Avaliar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
