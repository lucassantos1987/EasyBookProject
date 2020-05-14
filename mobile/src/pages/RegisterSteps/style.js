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
        fontSize: 35,
        fontWeight: 'bold'
    },
    content: {
        top: 80,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    textContent: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    selectContent: {
        height: 70,
        borderRadius: 20,
        borderColor: '#9b59b6',
        borderWidth: 1,
        fontSize: 20
    },
    inputContent: {
        height: 70,
        marginTop: 10,
        borderBottomColor : '#9b59b6',
        borderBottomWidth: 2,
        fontSize: 20,
        paddingLeft: 10
    },
    user: {
        top: -12,
        alignItems: 'center'
    },
    imageUser: {
        width: 200,
        height: 200,
        borderRadius: 200/2
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
        fontSize: 15,
    },
    next: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#8e44ad',
        height: 60,
        paddingHorizontal: 7,
    },
    buttonNext: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    },
    textButtonNext: {
        color: '#FFFFFF',
        fontSize: 20
    }
})