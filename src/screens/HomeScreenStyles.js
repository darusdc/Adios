import {StyleSheet, Dimensions} from 'react-native'
const {width} = Dimensions.get('window')
import Colors from '../constants/Colors'
const itemShowNumber = 2
const itemSpace = 16
const itemWidth = (width - (itemSpace * itemShowNumber + 1))/ itemShowNumber
const itemHeight = itemWidth - (itemSpace*itemShowNumber)
const styles = StyleSheet.create({
    container: {
        width,
        height: 280,
    },
    paginationStyle: {
        marginHorizontal: 4, 
        width:10, 
        height:10
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
})

export default styles