import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

const ProductDetailScreen = () => {
    const route = useRoute()
    const { id } = route.params
  return (
    <View>
      <Text>ProductDetailScreen</Text>
      <Text>{id}</Text>
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({})