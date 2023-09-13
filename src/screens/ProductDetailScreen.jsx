import { ImageBackground, View, ScrollView, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header } from '../components/Header/Header';
import SwiperFlatList from 'react-native-swiper-flatlist';
import realm from '../store/realm';
import styles from './HomeScreenStyles';
import Colors from '../constants/Colors';
import { Icon, Image } from '@rneui/base';
import { LargeText, MediumText, SmallText } from '../components/Text';
import productDetailStyles from './ProductDetailStyles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { CustomButton } from '../components/Button';
import { useSelector } from 'react-redux';
import { generateId } from '../utils/generateId';
import { useDispatch } from 'react-redux';
import { countProductCart } from '../utils/countProductCart';
import { addProductCartAmount } from '../store/redux/actions/ProductCartAmountAction';

const ProductDetailScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { userLoginId } = useSelector((store) => store.userLoginIdReducer);
  const { id } = route.params
  const [product, setProduct] = useState({});
  const [brandName, setBrandName] = useState('');
  const [productSizes, setProductSizes] = useState([])
  const getProduct = () => {
    const productDetail = realm.objects('Product').filtered(`id == ${id}`)[0]
    const productBrand = realm.objects('Brand').filtered(`id == ${productDetail.idBrand}`)[0];

    setProduct(productDetail)
    setBrandName(productBrand)
  }

  const getSizes = () => {
    const sizes = realm.objects('Size');

    realm.write(() => {
      sizes.forEach((item) => {
        item.isSelected = false;
      });
    });

    setProductSizes(sizes)
  }

  const onClickSize = (sizeId) => {
    const oldSizes = productSizes;

    realm.write(() => {
      oldSizes.forEach((item) => {
        item.isSelected = (item.id === sizeId)
      })
    })

    const updatedSizes = realm.objects('Size');
    setProductSizes(updatedSizes)
  }

  const onClickAddToCart = () => {
    const selectedSize = realm.objects('Size').filtered('isSelected == true')[0];

    if (selectedSize) {
      const existingData = realm.objects('Cart').filtered(
        `idUser == ${userLoginId} AND
          idProduct == ${id} AND
          idSelectedSize == ${selectedSize.id}`
      )[0];

      if (existingData) {
        realm.write(() => {
          existingData.quantity ++
        });

        ToastAndroid.show(
          'Successfully updated the quantity of product in your cart!',
          ToastAndroid.SHORT
        );
        getSizes();
      } else {
        const newId = generateId('Cart');
        realm.write(() => {
          realm.create('Cart', {
            id: newId,
            idUser: userLoginId,
            idProduct: id,
            idSelectedSize: selectedSize.id,
            quantity: 1,
            isSelected: false,
          });
        })
        ToastAndroid.show('Successfully add the product to cart!', ToastAndroid.SHORT);
      }

      const countResult = countProductCart(userLoginId);
      dispatch(addProductCartAmount(countResult));
      getSizes();
    } else {
      Alert.alert(
        'Warning!',
        'Please choose the size before add the product to cart!',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK pressed'),
          },
        ],
      );
    }
  };


  // const carouselRender = ({item}) => {
  //   console.log(item);
  //   <View style={styles.container}>
  //     <ImageBackground
  //       style={styles.imageBackgroundStyle}
  //       source={{ uri: item.link }}
  //     ></ImageBackground>
  //   </View>
  // }
  useEffect(() => {
    getProduct()
    getSizes()
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Header
        textToShow="Detail Product"
        isShowLogo
        isWhiteLogo
        isShowRightIcon
        isStackScreen
      />
      <ScrollView style={{ flex: 1 }}>
        <View>
          <SwiperFlatList
            data={product?.images}
            showPagination
            paginationStyleItem={styles.paginationStyle}
            paginationActiveColor={Colors.PRIMARY}
            renderAll
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Image
                  style={{ ...styles.imageBackgroundStyle, resizeMode: "contain" }}
                  source={{ uri: item.link }}

                />
              </View>
            )}
          />
        </View>

        <View style={productDetailStyles.productDetailContainer}>
          <MediumText textToShow={`${brandName?.brandName}`} textCustomStyle={productDetailStyles.uppercase} />
          <LargeText textToShow={product.name} textCustomStyle={productDetailStyles.productNameText} />
          <MediumText textToShow={`$ ${product.price}`} />
        </View>

        <SmallText
          textToShow='Select Size'
          textCustomStyle={{ ...productDetailStyles.heading, marginHorizontal: 16 }}
        />
        <FlatList
          data={productSizes}
          keyExtractor={(item) => item.id}
          numColumns={4}
          contentContainerStyle={{ padding: 8 }}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ ...productDetailStyles.sizeButtonContainer, backgroundColor: item.isSelected ? Colors.PRIMARY : null }} onPress={() => onClickSize(item.id)}>
              <SmallText textToShow={item.size} />
            </TouchableOpacity>
          )}
        />

        <View style={productDetailStyles.productDetailContainer}>
          <SmallText
            textToShow='Description'
            textCustomStyle={productDetailStyles.heading}
          />
          <SmallText
            textToShow={product.description}
            textCustomStyle={productDetailStyles.description}
          />
        </View>
      </ScrollView>

      <View style={productDetailStyles.bottomContainer}>
        <TouchableOpacity style={productDetailStyles.heartContainer}>
          <Icon
            name={product.isLike ? 'heart-circle-sharp' : "heart-circle-outline"}
            type='ionicon'
            size={30}
            color={product.isLike ? 'red' : 'black'}
          />
        </TouchableOpacity>
        <CustomButton
          textToShow='+ Add to Cart'
          buttonCustomStyle={productDetailStyles.addToCartButton}
          onPress={() => userLoginId != 0 ? onClickAddToCart() : navigation.navigate('Login')}
        />
      </View>
    </View>
  )
}

export default ProductDetailScreen