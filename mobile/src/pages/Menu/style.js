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
        top: -90,
        alignItems: 'center'
    },
    imageUser: {
        width: 300,
        height: 300,
        borderRadius: 300/2
    },
    textUser: {
        color: '#FFF',
        fontSize: 25,
        marginTop: 10
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
        backgroundColor: '#8e4da8',
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
        height: 180,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});