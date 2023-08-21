import React, { useState, useCallback } from 'react';
import { StyleSheet, View} from 'react-native'
import realm from '../store/realm';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import Product from '../components/Product';
import { Header } from '../components/Header/Header';
import { Text } from '@rneui/base';

const FavoriteProductScreen = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([])
    const navigation = useNavigation()

    const getFavoriteProduct = () => {
        const data = realm.objects('Product').filtered(`isLike == true`)
        setFavoriteProducts(data)
    }

    useFocusEffect(
        useCallback(() => {
            getFavoriteProduct()
        },[]
    ))
    
    return (
        <View style={styles.container}>
            <Header
                textToShow = "Favorite Products"
                isShowRightIcon
                isWhiteTitle
            />
            <FlatList
                data={favoriteProducts}
                contentContainerStyle={{padding: 8}}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <Product 
                        productName={item.name}
                        productPrice={item.price}
                        source={{uri:item.images[0].link}}
                        isLike = {item.isLike}
                        onPress = {() => navigation.navigate('ProductDetail',{id: item.id})}
                    />
                )}
            />
        </View>
    )
// here is return
}

export default FavoriteProductScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        resizeMode: "contain"
    }
})