import { StyleSheet, Text, View, Dimensions, ImageBackground, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
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


const renderItem = ({item}) => (
    <View style={styles.container}>
        <ImageBackground
        style={styles.imageBackgroundStyle}
        source={{ uri: item.thumbnail }}
        >
        <LargeText textToShow={item.tagline} textCustomStyle={{color: Colors.WHITE, fontWeight: 'bold'}}/>
        </ImageBackground>
    </View>
)

const listRenderItem = ({item}) => (
  <TouchableOpacity style={styles.productItemContainer}>
    <Image
    style={styles.productImage}
    source={{uri: item.images[0].link}}
    />
    
    <SmallText textToShow={item.name} textCustomStyle={{fontWeight: 'bold'}}/>
    <SmallText textToShow={`$ ${item.price}`} textCustomStyle={{marginBottom: 0}}/>

  </TouchableOpacity>

)

const HomeScreen = () => {
  const [products, setProduct] = useState([]);
  const collectData = () => {
    const productDB =  realm.objects('Product');
    const fiveProducts = productDB.slice(0,5);
    setProduct(fiveProducts);
    console.log('product amount: ', productDB.length);
  };
  useEffect(()=>{
    insertDummyData('Brand', brandData);
    insertDummyData('Gender', genderData);
    insertDummyData('Category', categoryData);
    insertDummyData('Size', sizeData);
    insertDummyData('Shipping', shippingData);
    insertDummyData('Product', productData);
    collectData();
  }, [])
  return (
    <SafeAreaView>
      <Header 
      textToShow="Adios"
      isShowRightIcon
      isShowLogo/>
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
        <MediumText textToShow="WEEKLY PRODUCT" textCustomStyle={styles.title}/>
        <FlatList 
        data={products}
        horizontal
        contentContainerStyle={{padding: 0}}
        keyExtractor={(item) => item.id}
        renderItem={listRenderItem} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen