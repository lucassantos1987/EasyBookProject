import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        top: 50,
        paddingHorizontal: 15,
        flexDirection: 'row'
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
    buttonHeaderBack: {
        position: 'absolute',
        alignContent: 'center',
        justifyContent: 'center',
        top: 10,
        right: 15
    },
    textButtonHeaderBack: {
        fontWeight: 'bold',
        color: '#9b59b6',
        fontSize: 17,
    },
    content: {
        top: 50,
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingBottom: 100,
    },
    inputContent: {
        height: 70,
        marginTop: 10,
        borderBottomColor : '#9b59b6',
        borderBottomWidth: 1,
        fontSize: 16,
        paddingLeft: 10
    },
    inputObs: {
        marginTop: 40,
        borderColor : '#9b59b6',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
        padding: 10,
        textAlignVertical: 'top'
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
    footer: {
        left: 0,
        right: 0,
        bottom: 0,
        height: 60,
    },
    buttonFooter: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#8e44ad',
    },
    textButtonFooter: {
        color: '#FFFFFF',
        fontSize: 17
    },
    list: {
        marginTop: 80,
    }
})