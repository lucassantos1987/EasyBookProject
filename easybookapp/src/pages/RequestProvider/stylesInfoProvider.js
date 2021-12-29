import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#FFF'
    },
    header: {
        position: 'absolute',
        top: 70,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    textHeader: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#FFF'
    },
    buttonHeaderBack: {
        position: 'absolute',
        left: 15
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    contacts: {
        left: 0,
        right: 0,
        bottom: 0,
        height: 120,
        position: 'absolute'
    },
    buttonContactsWhats: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#8e44ad',
    },
    buttonRating: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#9b59b6',
    },
    textButtonContacts: {
        color: '#FFFFFF',
        fontSize: 17
    },
    infoContainer: {
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 150
    },
    info: {
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    providerImg: {
        top: 0,
        width: 200,
        height: 200,
        borderRadius: 200/ 2,
    },
    textInfoName: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    textInfo: {
        top: 0,
        fontSize: 17,
    },
});