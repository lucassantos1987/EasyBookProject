import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#9b59b6',
        justifyContent: 'center',
        alignContent: 'center'
    },
    login: {
        left: 0,
        right: 0,
        bottom: 0,
    },
    loginInput: {
        backgroundColor: '#FFFFFF',
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 10,
        top: 0,
        marginTop: 10
    },
    buttonLogin: {
        backgroundColor: '#8e44ad',
        marginTop: 10,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButtonLogin: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    buttonRegister: {
        backgroundColor: '#9b59b6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        top: 20,
    },
    textButtonRegister: {
        fontSize: 14,
        textDecorationLine: 'underline',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});