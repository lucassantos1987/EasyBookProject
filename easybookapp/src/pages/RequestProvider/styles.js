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
        top: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
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
    inputSearch: {
        top: 70,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5
    },
    listCategory: {
        marginTop: 80,
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