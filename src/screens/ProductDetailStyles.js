import {StyleSheet, Dimensions} from 'react-native'
import Colors from '../constants/Colors';
const { width } = Dimensions.get('window');
const sizeWidth = (width - (16 * 5)) / 4;
const productDetailStyles = StyleSheet.create({
    productDetailContainer: {
        marginHorizontal: 16,
        },
    uppercase: {
        textTransform: 'uppercase',
        },
    productNameText: {
        fontWeight: 'bold',
        marginVertical: 0,
        },
    heading: {
        fontWeight: 'bold',
        marginBottom: 0,
    },
    sizeButtonContainer: {
        margin: 8,
        marginTop: 0,
        width: sizeWidth,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        alignItems: 'center',
        borderRadius: 100,
    },
    description: {
        textAlign: 'justify',
        marginBottom: 0,
    },
    bottomContainer: {
        padding: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    heartContainer: {
        borderWidth: 1,
        padding: 8,
        borderRadius: 100,
        borderColor: Colors.PRIMARY,
    },
    addToCartButton: {
        flex: 1,
        marginLeft: 16,
    },
})

export default productDetailStyles