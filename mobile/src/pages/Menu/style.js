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
        top: -20,
        alignItems: 'center'
    },
    imageUser: {
        width: 200,
        height: 200,
        borderRadius: 200/2
    },
    textUser: {
        color: '#FFF',
        fontSize: 25,
        marginTop: 10
    },
    buttonMenu: {
        backgroundColor: '#8e44ad',
        marginTop: 10,
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButtonMenu: {
        color: '#FFFFFF',
        fontSize: 17,
    }
});