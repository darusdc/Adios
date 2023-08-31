import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
const styles = StyleSheet.create({
    checkBoxContainer: {
        padding: 0,
        margin: 0,
        marginLeft: 0,
    },
    itemContainer: {
        margin: 8,
        borderBottomWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
    itemTopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemBottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    changeQuantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    changeQuantityButton: {
        width: 35,
        height: 35,
        borderRadius: 100,
        borderColor: Colors.PRIMARY,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        marginVertical: 0,
        marginHorizontal: 8
    },
    itemImage: {
        width: 100,
        height: 100,
        padding: 8,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 5,
    },
    itemDescriptionContainer: {
        marginHorizontal: 8,
        flex: 1,
    },
    bottomContainer: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderColor: Colors.BORDER_COLOR,
        borderTopWidth: 1,
    },
    leftBottomContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    buyButton: {
        width: '30%',
        padding: 4,
        marginHorizontal: 8,
    },
    topContainer: {
        borderColor: Colors.BORDER_COLOR,
        borderBottomWidth: 1,
    },
    innerTopContainer: {
        marginHorizontal: 16,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    innerTopLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteText: {
        textDecorationLine: 'underline',
        color: Colors.PRIMARY,
    },
    emptyContainer: {
        alignItems: 'center',
    },
    lottieContainer: {
        width: '40%',
        height: 200,
    },
    emptyMessageContainer: {
        position: 'absolute',
        bottom: 10,
    },

})

export default styles