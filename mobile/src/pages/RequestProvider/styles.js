import { StyleSheet } from 'react-native';

export default StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor: '#9b59b6',
        justifyContent: 'center',
        alignContent: 'center'
    },
    containerInfo: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    header: {
        top: 80,
        justifyContent: 'center',
        paddingHorizontal: 15,
        height: 100,
    },
    textHeader: {
        marginTop: -60,
        fontSize: 20,
        color: '#FFF'
    },
    inputSearch: {
        top: 20,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
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
        marginTop: 65,
        marginLeft: -150,
    },
    textButtonChat: {
        color: '#FFF',
        fontSize: 15
    },
    buttonInfo: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#9b59b6',
        paddingHorizontal: 20,
        height: 40,
        borderRadius: 10,
        marginTop: 65,
        marginLeft: 5,
    },
    textButtonInfo: {
        color: '#FFF',
        fontSize: 15
    },
    imageProvider: {
        width: 100,
        height: 100,
        borderRadius: 100/2
    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    providerImg: {
        width: 200,
        height: 200,
        borderRadius: 200/ 2,
    },
    textInfo: {
        fontSize: 20,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },    
})