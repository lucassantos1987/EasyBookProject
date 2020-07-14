import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#9b59b6',
        justifyContent: 'center',
        alignContent: 'center'
    },
    title: {
        marginTop: -200,
        justifyContent: 'center',
    },
    textTitle: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    localization: {
        top: 30,
    },
    buttonLocalization: {
        backgroundColor: '#8e44ad',
        marginTop: 10,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButtonLocalization: {
        color: '#FFFFFF',
        fontSize: 17,
    },
    inputLocalization: {
        height: 50,
        marginTop: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        fontSize: 20,
        paddingLeft: 10
    },
    toSearch: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 60,
    },
    buttonToSearch: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#8e44ad',
    },
    textButtonToSearch: {
        color: '#FFFFFF',
        fontSize: 17
    }
})