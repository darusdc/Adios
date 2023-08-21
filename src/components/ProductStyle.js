import {StyleSheet, Dimensions} from 'react-native'
const {width} = Dimensions.get('window')
import Colors from '../constants/Colors'
const itemShowNumber = 2
const itemSpace = 16
const itemWidth = (width - (itemSpace * itemShowNumber + 1))/ itemShowNumber
const itemHeight = itemWidth - (itemSpace*itemShowNumber)
const styles = StyleSheet.create({
        productItemContainer: {
            borderWidth: 1,
            borderColor: Colors.BORDER_COLOR,
            width: itemWidth+5,
            flex: 1,
            padding: 16,
            margin: 8,
            borderRadius: 5,
            zIndex:1
        },
        productImage: {
            width: itemWidth-5,
            height: itemHeight,
            resizeMode: 'contain',
            zIndex:0,
        },
        heartIconContainer: {
            width: 40,
            height: 40,
            borderColor: Colors.BORDER_COLOR,
            borderWidth: 1,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            position:'absolute',
            right:3,
            top:3,
            zIndex:1
        },
    })

export default styles