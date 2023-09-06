import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { Header } from '../components/Header/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import Colors from '../constants/Colors'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from '@rneui/themed'
import { MediumText, SmallText } from '../components/Text'
import { CustomButton } from '../components/Button'
import { useSelector } from 'react-redux'
import realm from '../store/realm'

const OrderConfirmationScreen = () => {
  const route = useRoute()
  const { totalPrice, totalQuantity } = route.params
  const { userLoginId } = useSelector((store) => store.userLoginIdReducer)
  const [user, setUser] = useState([])
  const navigation = useNavigation()

  const getUser = () => {
    const userData = realm.objects('User').filtered(`id == ${userLoginId}`)[0]
    setUser(userData)
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Header
        isStackScreen
        isWhiteTitle
        textToShow="Order Confirmation"
      />

      <ScrollView>
        <View style={styles.shippingContainer}>
          <View style={styles.shippingLeftContainer}>
            <View style={styles.shippingIconContainer}>
              <Icon
                name='truck-delivery' type='material-community'
                color={Colors.PRIMARY} size={30}
              />
            </View>
            <View style={styles.shippingDescriptionContainer}>
              <SmallText textToShow='Shipping Name' />
              <SmallText textToShow='Shipping Date' textCustomStyle={{ marginTop: 0 }} />
            </View>
          </View>
          <CustomButton
            textToShow='Change'
            buttonCustomStyle={styles.changeShippingButton}
            textCustomStyle={{ color: Colors.PRIMARY }}
          />
        </View>

        <View style={styles.shippingAddressContainer}>
          <SmallText
            textToShow='Shipping Address'
            textCustomStyle={[styles.grayText, { fontWeight: 'bold' }]}
          />
          <MediumText textToShow={`${user.name}`} />
          {user.address ?
            <SmallText
              textToShow={`${user.address}`}
              textCustomStyle={styles.grayText}
            /> :
            <View style={styles.messageContainer}>
              <SmallText
                textToShow='Please input your address '
                textCustomStyle={styles.grayText}
              />
              <TouchableOpacity
                onPress={() => { navigation.navigate('EditAddress') }}>
                <SmallText
                  textToShow='here'
                  textCustomStyle={styles.hereText}

                />
              </TouchableOpacity>
            </View>
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default OrderConfirmationScreen

const styles = StyleSheet.create({
  shippingContainer: {
    flexDirection: 'row',
    borderColor: Colors.BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    margin: 16,
  },
  shippingLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  shippingIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: Colors.LIGHT_BLUE,
  },
  shippingDescriptionContainer: {
    marginLeft: 8,
    flex: 1,
  },
  changeShippingButton: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.WHITE,
    padding: 0,
    width: '30%',
  },
  shippingAddressContainer: {
    borderColor: Colors.BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
  },
  grayText: {
    color: Colors.GRAY,
    marginVertical: 0,
  },
  messageContainer: {
    flexDirection: 'row',
  },
  hereText: {
    color: Colors.PRIMARY,
    textDecorationLine: 'underline',
    marginVertical: 0,
    fontWeight: 'bold',
  },
})