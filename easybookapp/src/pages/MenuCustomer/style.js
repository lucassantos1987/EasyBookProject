import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#9b59b6',
        justifyContent: 'center',
        alignContent: 'center'
    },
    menu: {
        left: 0,
        right: 0,
        bottom: 0,
    },
    user: {
        top: -100,
        alignItems: 'center'
    },
    imageUser: {
        paddingHorizontal: 10,
        width: 250,
        height: 250,
        borderRadius: 250/2,
        borderWidth: 10,
        borderColor: '#FFFFFF'
    },
    optionImage1: {
        width: 35,
        height: 35
    },
    optionImage2: {
        width: 50,
        height: 50
    },
    textUser: {
        color: '#FFF',
        fontSize: 25,
        marginTop: 10
    },
    buttonMenuMyPhoto: {
        backgroundColor: '#8c37ab',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonMenuMyData: {
        backgroundColor: '#8e44ad',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonMenuMySpeciality: {
        backgroundColor: '#8f47ad',
        borderBottomColor: '#9c04d9',
        opacity: 0.9,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonMenuLogout: {
        backgroundColor: '#842ea3',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButtonMenu: {
        color: '#FFFFFF',
        fontSize: 17,
    },
    containerMenuButtons: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 240,
    },
    spinnerTextStyle: {
        color: '#FFF'
    }
});