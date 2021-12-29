import { StyleSheet } from 'react-native';

export default StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor: '#9b59b6',
        justifyContent: 'center',
        alignContent: 'center'
    },
    header: {
        flexDirection: 'row',
        top: 40,
        paddingHorizontal: 15,
        height: 60,
        borderBottomColor: '#FFF',
        borderBottomWidth: 1
    },
    subHeader: {
        top: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    textHeaderLogo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF'
    },
    textSubHeader: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#FFF'
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
    buttonHeaderLogin: {
        position: 'absolute',
        height: 40,
        width: 100,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#8e44ad'
    },
    inputSearch: {
        top: 60,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5
    },
    listCategory: {
        marginTop: 80,
        flexBasis: 0
    },
    category: {
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomColor: '#7f8c8d',
        borderBottomWidth: 0.5
    },
    provider: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomColor: '#7f8c8d',
        borderBottomWidth: 0.5
    },
    textCategory: {
        fontSize: 25,
    },
    textProvider: {
        marginTop: 5,
        fontSize: 25,
    },
    textCount: {
        marginTop: 5,
        fontSize: 17,
        color: '#7f8c8d',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})