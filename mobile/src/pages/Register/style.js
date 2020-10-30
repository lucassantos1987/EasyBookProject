import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        top: 50,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    textHeader: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    textHeaderSpeciality: {
        marginTop: 90,
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 15
    },
    textHeaderUser: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    content: {
        top: 50,
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingBottom: 250,
    },
    inputContent: {
        height: 70,
        marginTop: 10,
        borderBottomColor : '#9b59b6',
        borderBottomWidth: 1,
        fontSize: 16,
        paddingLeft: 10
    },
    buttonContent: {
        top: 10,
        height: 50,
        backgroundColor: '#9b59b6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonRegister: {
        top: 100,
        height: 50,
        backgroundColor: '#9b59b6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    textButtonContent: {
        color: '#FFFFFF'
    },
    user: {
        top: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    imageUser: {
        paddingVertical: 50,
        width: 250,
        height: 250,
        borderRadius: 250/2
    },
    buttonContentUserImage: {
        top: 50,
        marginTop: 10,
        height: 50,
        backgroundColor: '#9b59b6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },    
})