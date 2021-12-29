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
        left: 15
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
        margin: 0,
        backgroundColor: '#ecf0f1',                
      },
      modalView: {
        position: 'absolute',
        margin: 0,
        left: 10,
        right: 10,        
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
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
        borderRadius: 10,
        paddingHorizontal: 130
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
        fontWeight: 'bold',
        fontSize: 17        
      },
      inputTitleRating: {
        height: 40,
        marginTop: 0,
        borderColor : '#9b59b6',
        borderWidth: 1,
        fontSize: 16,
        paddingLeft: 10,
        borderRadius: 10,
        width: 290        
    },
    inputObsRating: {
        marginTop: 10,
        borderColor : '#9b59b6',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
        padding: 10,
        textAlignVertical: 'top',
        height: 200        
    },

});