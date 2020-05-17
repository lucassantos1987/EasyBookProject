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
    buttonDetails: {
        marginTop: 10,
        flexDirection: 'row'
    },
    textButtonDetails: {
        marginTop: 10,
        color: '#9b59b6',
        fontWeight: 'bold',
        fontSize: 17
    },
    buttonChat: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#9b59b6',
        paddingHorizontal: 20,
        height: 40,
        borderRadius: 10,
        marginTop: 45,
        marginLeft: -130,
    },
    textButtonChat: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 17
    },
    buttonInfo: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#9b59b6',
        paddingHorizontal: 20,
        height: 40,
        borderRadius: 10,
        marginTop: 45,
        marginLeft: 5,
    },
    textButtonInfo: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 17
    },
    imageProvider: {
        width: 100,
        height: 100,
        borderRadius: 100/2
    },    
})