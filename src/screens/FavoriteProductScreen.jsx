import React, { useState, useCallback } from 'react';
import { View } from 'react-native'
import realm from '../store/realm';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import Product from '../components/Product';
import { Header } from '../components/Header/Header';
import { useSelector } from 'react-redux';
import styles from './OrderHistoryScreenStyles';
import LottieView from 'lottie-react-native';
import { MediumText } from '../components/Text';

const FavoriteProductScreen = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([])
    const navigation = useNavigation()
    const { userLoginId } = useSelector((store) => store.userLoginIdReducer)

    const getFavoriteProduct = () => {
        const data = realm.objects('Product').filtered(`isLike == true`)
        setFavoriteProducts(data)
    }

    const onClickHeart = (productId) => {
        const product = realm.objects('Product').filtered(`id == ${productId}`)[0];
        const userFavorites = realm.objects('FavoriteProduct').filtered(`idUser == ${userLoginId}`)[0];

        realm.write(() => {
            product.isLike = false;
            userFavorites.idProducts.delete(productId);
        });

        getFavoriteProduct()
    };

    useFocusEffect(
        useCallback(() => {
            getFavoriteProduct()
        }, []
        ))

    return (
        <View style={{ flex: 1 }}>
            <Header
                textToShow="Favorite Products"
                isShowRightIcon
                isWhiteTitle
            />
            <FlatList
                data={favoriteProducts}
                contentContainerStyle={{ padding: 8 }}
                keyExtractor={(item) => item.id}
                numColumns={2}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <View style={styles.lottieContainer}>
                            <LottieView
                                style={{ width: '100%', height: '100%' }}
                                autoPlay
                                loop
                                source={require('../assets/lotties/empty-list.json')}
                            />
                        </View>
                        <View style={styles.emptyMessageContainer}>
                            <MediumText textToShow='No items.' />
                        </View>
                    </View>
                }
                renderItem={({ item }) => (
                    <Product
                        productName={item.name}
                        productPrice={item.price}
                        source={{ uri: item.images[0].link }}
                        isLike={item.isLike}
                        onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
                        onPressHeart={() => onClickHeart(item.id)}
                    />
                )}
            />
        </View>
    )
}

export default FavoriteProductScreen