import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#FFFFFF'
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
        left: 10
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    contacts: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 120,
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
    inputObs: {
        paddingVertical: 30,
        marginTop: 30,
        borderTopColor : '#9b59b6',
        borderTopWidth: 1,
        fontSize: 16,
        padding: 10,
        textAlignVertical: 'top',
        fontWeight: 'bold'
    },
    infoContainer: {
        top: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        top: -50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    providerImg: {
        top: -80,
        width: 250,
        height: 250,
        borderRadius: 200/ 2,
    },
    textInfoName: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    textInfo: {
        top: 15,
        fontSize: 17,
    },
    textInfoObs: {
        top: 20,
        fontWeight: 'bold',
        fontSize: 17,
    },
});