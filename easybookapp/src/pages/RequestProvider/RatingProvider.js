import  React, {useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, FlatList, Alert, Modal, TextInput } from 'react-native';
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
    const [modalVisible, setModalVisible] = useState(false);
    const [titleRating, setTitleRating] = useState('');
    const [descriptionRating, setDescriptionRating] = useState('');
    const [rating, setRating] = useState(0);
    const [idProvider, setIdProvider] = useState();
    const [idCustomer, setIdCustomer] = useState();

    const navigation = useNavigation();

    const descriptionRating_input = useRef();

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

    async function sendRating() {

        setLoading(true);

        const data = {
            idProvider,
            idCustomer,
            rating,
            titleRating,
            descriptionRating
        };

        await api.post('rating_provider', data)
        .then(function(response) {
            setLoading(false);
            Alert.alert(response.data.message);
        })
        .catch(function(error) {
            setLoading(false);
            Alert.alert(error.message);
        })

        setModalVisible(!modalVisible)        
    }

    function ratingCompleted(rating) {
        setRating(rating)
        console.log("Rating is " +  rating);
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
                    style={styles.buttonRating}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.textButtonRating}>Avaliar</Text>
                </TouchableOpacity>
            </View>
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(false);
                }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>O que você achou do profissional?</Text>
                        <View style={{ paddingBottom: 20}}>
                        <Rating
                            imageSize={30}
                            fractions={1} 
                            ratingCount={5} 
                            startingValue={rating}
                            onFinishRating={ratingCompleted}/>
                        </View>
                        <View style={{ paddingBottom: 20 }}>
                            <TextInput
                                style={styles.inputTitleRating}
                                placeholder="Título da Avaliação. Exemplo: Bom"
                                value={titleRating}
                                onChangeText={(text) => setTitleRating(text)}
                                onSubmitEditing={() => descriptionRating_input.current.focus()}
                                blurOnSubmit={false}
                                returnKeyType="next" />
                            <TextInput
                                style={styles.inputObsRating}
                                multiline
                                placeholder="Descreva a sua Avaliação sobre o profissional"
                                value={descriptionRating}
                                onChangeText={(text) => setDescriptionRating(text)}
                                ref={descriptionRating_input}/>
                        </View>    
                        <TouchableOpacity style={styles.buttonModal}
                            onPress={sendRating}>
                            <Text style={styles.textStyle}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
