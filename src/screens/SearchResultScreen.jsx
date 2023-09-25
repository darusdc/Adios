import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { Header } from '../components/Header/Header'
import { LargeText, MediumText, SmallText } from '../components/Text'
import Colors from '../constants/Colors'
import realm from '../store/realm'
import Product from '../components/Product'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import LottieView from 'lottie-react-native'
import { useSelector } from 'react-redux'

const SearchResult = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { searchKeyword } = route.params
  const [productResults, setProductResults] = useState([])
  const [resultCount, setResultCount] = useState(0)
  const { userLoginId } = useSelector((store) => store.userLoginIdReducer)

  const getProduct = () => {
    const data = realm.objects('Product').filtered(`name CONTAINS[c] "${searchKeyword}"`);
    setProductResults(data)
    setResultCount(data.length)
  }


  const onClickHeart = (productId, currentLikeStatus) => {
    if (userLoginId != 0) {
      const product = realm.objects('Product').filtered(`id == ${productId}`)[0]
      realm.write(() => {
        product.isLike = !currentLikeStatus
      })

      getProduct()

      const favoriteList = realm.objects('FavoriteProduct').filtered(`idUser == ${userLoginId}`)[0]
      if (favoriteList) {
        const isProductExist = favoriteList.idProducts.has(productId)

        realm.write(() => {
          if (isProductExist) {
            favoriteList.idProducts.delete(productId)
          } else {
            favoriteList.idProducts.add(productId)
          }
        })

      } else {
        const newId = generateId('FavoriteProduct')

        realm.write(() => {
          realm.create('FavoriteProduct', {
            id: newId,
            idUser: userLoginId,
            idProducts: [productId]
          })
        })
      }
    } else {
      navigation.navigate('Login')
    }
  }

  useFocusEffect(useCallback(
    () => {
      getProduct()
    },
    [],
  )
  )
  return (
    <View style={{flex:1}}>
      <Header
        textToShow="Search Result"
        isStackScreen
        isShowLogo
        isShowRightIcon />
      <View style={styles.topContainer}>
        <LargeText textToShow={`Search result for "${searchKeyword}"`}
          textCustomStyle={{ fontWeight: 'bold', marginTop: 0 }} />
        <SmallText
          textToShow={`${resultCount} products`}
          textCustomStyle={{ marginVertical: 0 }}
        />
      </View>
      <ScrollView style={{flex: 1}}>

      <FlatList
        scrollEnabled={false}
        data={productResults}
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
                source={require('../assets/lotties/data-not-found.json')}
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
            onPressHeart={() => onClickHeart(item.id, item.isLike)}
          />
        )}
      />
      </ScrollView>
    </View>
  )
}

export default SearchResult

const styles = StyleSheet.create({
  topContainer: {
    borderColor: Colors.BORDER_COLOR,
    borderBottomWidth: 1,
    padding: 16,
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
    bottom: 10
  }
})