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
        fontSize: 40,
        fontWeight: 'bold'
    },
    next: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#9b59b6',
        height: 70,
        paddingHorizontal: 7,
    },
    buttonNext: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 70
    },
    textButtonNext: {
        color: '#FFFFFF',
        fontSize: 20
    }
})