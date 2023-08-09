import {StyleSheet, Dimensions} from 'react-native'
import Colors from '../constants/Colors';
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        padding: 8,
        paddingHorizontal: 16,
    },
    input: {
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginTop: 0,
        fontSize: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    innerInput: {
        flex: 1,
        color:'black',
    },
    errorMessage: {
        color: 'red',
        marginTop: 0,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    registerButton: {
        marginTop: 16,
    },
    bottomContentContainer: {
        alignItems: 'center',
    },
    questionContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    loginText: {
        color: Colors.PRIMARY,
        textDecorationLine: 'underline',
    },
});

export default styles