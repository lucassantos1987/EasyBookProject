import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9b59b6'
    },
    header: {
        top: 50,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    textHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF'
    },
    buttonHeaderBack: {
        position: 'absolute',
        alignContent: 'center',
        justifyContent: 'center',
        top: 11,
        right: 15
    },
    textButtonHeaderBack: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 15,
    },
    title: {
        top: 90,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    textTitle: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    content: {
        top: 100,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    buttonContent: {
        backgroundColor: '#8e44ad',
        marginTop: 10,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButtonContent: {
        color: '#FFFFFF',
        fontSize: 17,
    },
    inputContent: {
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
    },
    buttonRegister: {
        top: -30,
        backgroundColor: '#9b59b6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    buttonLogin: {
        top: -10,
        backgroundColor: '#9b59b6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    textButtonRegister: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }    
})