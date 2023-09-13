import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')
import Colors from '../constants/Colors'
const itemShowNumber = 2
const itemSpace = 16
const itemWidth = (width - (itemSpace * itemShowNumber + 1)) / itemShowNumber
const itemHeight = itemWidth - (itemSpace * itemShowNumber)
const styles = StyleSheet.create({
    container: {
        width,
        height: 280,
    },
    paginationStyle: {
        marginHorizontal: 4,
        width: 10,
        height: 10
    },
    imageBackgroundStyle: {
        width,
        height: 250,
        alignItems: 'center'
    },
    textBold: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    },
    title: {
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginVertical: 0
    },
    genderImage: {
        width: width - 32,
        height: width - 32,
        alignItems: 'baseline',
        justifyContent: 'flex-end',
    },
    genderNameContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.BLACK,
        alignItems: 'center',
        padding: 8,
        margin: 16,
        borderRadius: 5,
    },
    genderName: {
        textTransform: 'uppercase',
        color: Colors.WHITE,
        marginRight: 8,
    },
    brandTitle: {
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginBottom: 0,
    },
    brandImageBackground: {
        width: (width - 64) / 3,
        height: (width - 64) / 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandImage: {
        borderRadius: 5,
        opacity: 0.8,
    },
    brandLogoImage: {
        width: (width - 64) / 5,
        height: (width - 64) / 5,
        resizeMode: 'contain',
    },
})

export default styles