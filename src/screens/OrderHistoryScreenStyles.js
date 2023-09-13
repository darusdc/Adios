import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

const styles = StyleSheet.create({
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
    orderContainer: {
        margin: 8,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 8,
    },
    orderTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 16,
    },
    orderTopLeftContainer: {
        flexDirection: 'row',
    },
    lineBreak: {
        borderBottomWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
    orderTopRightContainer: {
        backgroundColor: Colors.BG_GREEN,
        width: '20%',
        alignItems: 'center',
        borderRadius: 100,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        backgroundColor: Colors.LIGHT_BLUE,
    },
    infoContainer: {
        justifyContent: 'center',
        marginLeft: 8,
    },
    orderDetailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
    },
    productImage: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 5,
    },
    productDescriptionContainer: {
        marginHorizontal: 8,
        flex: 1,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderColor: Colors.BORDER_COLOR,
        borderTopWidth: 1,
        flex: 1,
    },
    bottomLeftContainer: {
        flex: 1,
        marginVertical: 16,
        marginLeft: 16,
    },
    buttonStyle: {
        width: '30%',
        padding: 0,
        marginRight: 16,
    },
})

export default styles