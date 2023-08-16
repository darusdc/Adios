import { TouchableOpacity, Image} from 'react-native'
import { Icon } from '@rneui/base'
import styles from './ProductStyle'
import { SmallText } from './Text'
export default Product =  (props) => {
    const {productName, productPrice, onPressHeart, isLike, onPress} = props;

    return (
        <TouchableOpacity style={styles.productItemContainer} onPress={onPress}>
            <TouchableOpacity style={styles.heartIconContainer}
                onPress={onPressHeart}>
                <Icon 
                    name={isLike? 'heart-circle-sharp':'heart-circle-outline'} 
                    type='ionicon'
                    color={isLike? 'red':'black'}/>
            </TouchableOpacity>
            
            <Image
            style={styles.productImage}
            {...props}
            />
            
            <SmallText textToShow={productName} textCustomStyle={{fontWeight: 'bold'}}/>
            <SmallText textToShow={`$ ${productPrice}`} textCustomStyle={{marginBottom: 0}}/>
    
        </TouchableOpacity>
    )
}