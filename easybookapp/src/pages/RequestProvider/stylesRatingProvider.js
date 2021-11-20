import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#FFFFFF'
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
        color: '#9b59b6'
    },
    buttonHeaderBack: {
        position: 'absolute',
        left: 10
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    rating: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 60,
    },
    buttonRating: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#8e44ad',
    },
    textButtonRating: {
        color: '#FFFFFF',
        fontSize: 17
    },
    listRating: {
        marginTop: 80,
    },
    contentRating: {
        flexDirection: 'row',
    },
    contentUSer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },
    nameUserText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        margin: 0
      },
      modalView: {
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      buttonModal: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#8e44ad',
        paddingHorizontal: 100,
        borderRadius: 10
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },    
});