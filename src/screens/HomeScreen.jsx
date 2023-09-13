import { View, ImageBackground, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { carouselData } from '../data/carouselDummyData'
import styles from './HomeScreenStyles'
import { insertDummyData } from '../utils/insertDummyData'
import realm from '../store/realm'
import { brandData } from '../data/brandDummyData';
import { genderData } from '../data/genderDummyData';
import { categoryData } from '../data/categoryDummyData';
import { sizeData } from '../data/sizeDummyData';
import { shippingData } from '../data/shippingDummyData';
import { productData } from '../data/productDummyData';
import { LargeText, MediumText, SmallText } from '../components/Text'
import Colors from '../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../components/Header/Header'
import Product from '../components/Product'
import { useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { generateId } from '../utils/generateId'
import { FavoriteProduct } from '../store/realm/models/FavoriteProduct'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon, Image } from '@rneui/themed'


const renderItem = ({ item }) => (
  <View style={styles.container}>
    <ImageBackground
      style={styles.imageBackgroundStyle}
      source={{ uri: item.thumbnail }}
    >
      <LargeText textToShow={item.tagline} textCustomStyle={{ color: Colors.WHITE, fontWeight: 'bold' }} />
    </ImageBackground>
  </View>
)

const HomeScreen = () => {
  const [products, setProduct] = useState([]);
  const { userLoginId } = useSelector((store) => store.userLoginIdReducer)
  const navigation = useNavigation()
  const [genders, setGenders] = useState([])
  const [brands, setBrands] = useState([])
  const [startIndex, setStartIndex] = useState([])

  const collectData = () => {
    const productDB = realm.objects('Product');
    const maxIndexToRandom = productDB.length - 4
    const selectedIndex = Math.floor(Math.random() * maxIndexToRandom)
    const fiveProducts = getRandomProduct(selectedIndex);

    setProduct(fiveProducts);
    setStartIndex(selectedIndex)
  };

  const getRandomProduct = (randomIndex) => {
    const productDB = realm.objects('Product');
    const fiveProducts = productDB.slice(randomIndex, randomIndex + 5);

    return fiveProducts;
  }

  const getGenders = () => {
    const gendersDB = realm.objects('Gender')
    setGenders(gendersDB)
  }

  const getBrands = () => {
    const brandsDB = realm.objects('Brand')
    setBrands(brandsDB)
  }

  const listRenderItem = ({ item }) => (
    <Product
      productName={item.name}
      productPrice={item.price}
      source={{ uri: item.images[0].link }}
      isLike={item.isLike}
      onPressHeart={() => onClickHeart(item.id, item.isLike)}
      onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
    />
  )

  const onClickMenu = (basedOnId, basedOnName, basedOnAny) => {
    navigation.navigate('ProductList', {
      basedOnId,
      basedOnName,
      basedOnAny,
    });
  };

  const onClickHeart = (productId, currentLikeStatus) => {
    if (userLoginId != 0) {
      const product = realm.objects('Product').filtered(`id == ${productId}`)[0]
      realm.write(() => {
        product.isLike = !currentLikeStatus
      })

      const fiveProducts = getRandomProduct(startIndex)
      setProduct(fiveProducts)

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

  useEffect(() => {
    insertDummyData('Brand', brandData);
    insertDummyData('Gender', genderData);
    insertDummyData('Category', categoryData);
    insertDummyData('Size', sizeData);
    insertDummyData('Shipping', shippingData);
    insertDummyData('Product', productData);
    collectData();
    getGenders()
    getBrands()
  }, [])

  useFocusEffect(
    useCallback(
      () => {
        collectData()
      },
      [],
    )

  )
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        textToShow="Adios"
        isShowRightIcon
        isShowLogo />
      <ScrollView
        vertical
      >
        <View style={styles.container}>
          <SwiperFlatList
            data={carouselData}
            autoplay
            autoplayDelay={3}
            autoplayLoop
            showPagination
            paginationStyle={styles.paginationStyle}
            paginationActiveColor='blue'
            renderAll
            renderItem={renderItem}>

          </SwiperFlatList>
        </View>
        <MediumText textToShow="WEEKLY PRODUCT" textCustomStyle={styles.title} />
        <FlatList
          data={products}
          horizontal
          contentContainerStyle={{ padding: 0 }}
          keyExtractor={(item) => item.id}
          renderItem={listRenderItem} />

        <FlatList
          data={genders}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ padding: 8, paddingTop: 0 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ margin: 8 }} onPress={() => onClickMenu(item.id, item.genderName, 'Gender')}>
              <ImageBackground
                source={{ uri: item.thumbnail }}
                style={styles.genderImage}
                imageStyle={{ borderRadius: 5 }}
              >
                <View style={styles.genderNameContainer}>
                  <MediumText
                    textToShow={item.genderName}
                    textCustomStyle={styles.genderName}
                  />
                  <Icon
                    name='rightcircle'
                    type='antdesign'
                    color={Colors.WHITE}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />

        <MediumText
          textToShow='BEST BRAND DEALS'
          textCustomStyle={styles.brandTitle}
        />
        <FlatList
          data={brands}
          numColumns={3}
          contentContainerStyle={{ padding: 8 }}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ margin: 8 }} onPress={() => onClickMenu(item.id, item.brandName, 'Brand')}>
              <ImageBackground
                source={{ uri: item.thumbnail }}
                style={styles.brandImageBackground}
                imageStyle={styles.brandImage}
              >
                <Image
                  source={{ uri: item.logo }}
                  style={styles.brandLogoImage}
                />
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView >
  )
}

export default HomeScreen