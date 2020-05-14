import { StyleSheet } from 'react-native';

export default StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor: '#9b59b6',
        justifyContent: 'center',
        alignContent: 'center'
    },
    header: {
        top: 50,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    textHeader: {
        fontSize: 20,
        color: '#FFF'
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
    textCategory: {
        fontSize: 25,
    },
    textCount: {
        marginTop: 5,
        fontSize: 17,
        color: '#7f8c8d',
    },
    buttonDetails: {
        marginTop: 10,
        flexDirection: 'row'
    },
    textButtonDetails: {
        marginTop: 10,
        color: '#9b59b6',
        fontWeight: 'bold',
        fontSize: 17
    }
})