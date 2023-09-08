import { ToastAndroid, View } from 'react-native'
import Modal from 'react-native-modal'
import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import { Header } from '../components/Header/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import Colors from '../constants/Colors'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { CheckBox, Icon, Image } from '@rneui/themed'
import { LargeText, MediumText, SmallText } from '../components/Text'
import { CustomButton } from '../components/Button'
import { useSelector } from 'react-redux'
import realm from '../store/realm'
import { getProductImage, getProductName, getProductPrice, getSelectedSize } from '../utils/getProductInfomation';
import { copyArrayOfObjects } from '../utils/copyData';
import { Modalize } from 'react-native-modalize';
import LottieView from 'lottie-react-native';
import { styles } from './OrderConfirmationScreenStyle';


const OrderConfirmationScreen = () => {
  const route = useRoute()
  const { totalPrice, totalQuantity } = route.params
  const { userLoginId } = useSelector((store) => store.userLoginIdReducer)
  const [user, setUser] = useState([])
  const navigation = useNavigation()
  const [cartsToOrder, setCartsToOrder] = useState([]);
  const fee = { serviceFee: 2 }
  const [shippingList, setShippingList] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState({});
  const shippingModalizeRef = useRef(null)
  const [isShowSuccessModal, setIsShowSuccessModal] = useState(false);

  const getUser = () => {
    const userData = realm.objects('User').filtered(`id == ${userLoginId}`)[0]
    setUser(userData)
  }

  const getCarts = () => {
    const carts = realm.objects("Cart").filtered(`idUser == ${userLoginId}`)
    setCartsToOrder(carts)
  }

  const resetShipping = () => {
    const shippings = realm.objects('Shipping');

    realm.write(() => {
      shippings.forEach((item) => {
        item.isSelected = item.id === 1
      });
    });
  };

  const getShippingList = () => {
    const shippings = realm.objects('Shipping');
    const defaultShipping = shippings.filtered('isSelected == true')[0];
    const copiedShippings = copyArrayOfObjects(shippings);
    setSelectedShipping(defaultShipping);
    setShippingList(copiedShippings);
  };

  const onClickChangeShipping = () => {
    shippingModalizeRef.current?.open();
  };

  const currentSelectedShipping = (shippingId) => {
    const tempUpdatedShipping = shippingList.map((item) => {
      item.isSelected = (item.id === shippingId)
      return item;
    });

    setShippingList(tempUpdatedShipping);
  };

  const onSaveShipping = () => {
    const selectedShipping = shippingList.find((item) => item.isSelected === true);
    const shippingsOnDB = realm.objects('Shipping');

    realm.write(() => {
      shippingsOnDB.forEach((item) => {
        item.isSelected = item.id === selectedShipping.id
      });
    });

    getShippingList();
    ToastAndroid.show(
      'Successfully updated shipping!',
      ToastAndroid.SHORT
    );
    shippingModalizeRef.current?.close();
  };

  const estimationDate = () => {
    const months = [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'
    ];
    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    const tomorrowDate = tomorrow.getDate();
    const tomorrowMonth = months[tomorrow.getMonth()];

    const dayAfterTomorrowDate = dayAfterTomorrow.getDate();
    const dayAfterTomorrowMonth = months[dayAfterTomorrow.getMonth()];

    if (tomorrowMonth !== dayAfterTomorrowMonth) {
      return `${tomorrowDate} ${tomorrowMonth} - ${dayAfterTomorrowDate} ${dayAfterTomorrowMonth}`;
    } else {
      return `${tomorrowDate} - ${dayAfterTomorrowDate} ${dayAfterTomorrowMonth}`;
    }
  };

  const onClickBuy = () => {
    setIsShowSuccessModal(true);
  };

  const navigateToHome = () => {
    navigation.popToTop();
  };

  useEffect(() => {
    resetShipping()
    getUser()
    getCarts()
    getShippingList()
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
              <SmallText textToShow={`${selectedShipping.shippingName}`} />
              <SmallText textToShow={estimationDate()} textCustomStyle={{ marginTop: 0 }} />
            </View>
          </View>
          <CustomButton
            textToShow='Change'
            buttonCustomStyle={styles.changeShippingButton}
            textCustomStyle={{ color: Colors.PRIMARY }}
            onPress={() => onClickChangeShipping()}
          />
        </View>

        <View style={styles.shippingAddressContainer}>
          <SmallText
            textToShow='Shipping Address'
            textCustomStyle={[styles.grayText, { fontWeight: 'bold' }]}
          />
          <MediumText textToShow={`${user.name}`} />
          {user.address != "" ?
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

        <FlatList
          data={cartsToOrder}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
          ListHeaderComponent={
            <View style={styles.listTitleContainer}>
              <SmallText
                textToShow='Your Order'
                textCustomStyle={styles.listTitle}
              />
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                style={styles.image}
                source={{ uri: getProductImage(item.idProduct) }}
              />

              <View style={styles.itemDescriptionContainer}>
                <SmallText textToShow={getProductName(item.idProduct)} />
                <SmallText
                  textToShow={getSelectedSize(item.idSelectedSize)}
                  textCustomStyle={styles.grayText}
                />
                <SmallText
                  textToShow={`${item.quantity} Products`}
                  textCustomStyle={{ color: Colors.GRAY }}
                />
                <SmallText
                  textToShow={`$ ${getProductPrice(item.idProduct, item.quantity)}`}
                  textCustomStyle={{ marginTop: 0 }}
                />
              </View>
            </View>
          )}
        />

        <View style={styles.orderSummaryContainer}>
          <SmallText
            textToShow='Order Summary'
            textCustomStyle={[styles.grayText, { fontWeight: 'bold' }]}
          />
          <View style={styles.summaryListContainer}>
            <SmallText textToShow='Total Price' />
            <SmallText textToShow={`$ ${totalPrice}`} />
          </View>

          <View style={styles.summaryListContainer}>
            <SmallText textToShow='Delivery Fee' textCustomStyle={{ marginVertical: 0 }} />
            <SmallText textToShow={`$ ${selectedShipping.deliveryFee}`} textCustomStyle={{ marginVertical: 0 }} />
          </View>
          <View style={styles.summaryListContainer}>
            <SmallText textToShow='Service Fee' textCustomStyle={{ marginBottom: 0 }} />
            <SmallText textToShow={`$ ${fee.serviceFee}`} textCustomStyle={{ marginBottom: 0 }} />
          </View>
        </View>

      </ScrollView>
      <Modalize ref={shippingModalizeRef} adjustToContentHeight>
        <View style={styles.shippingTitleContainer}>
          <LargeText
            textToShow='Select One of These Expeditions'
            textCustomStyle={{ marginVertical: 0 }}
          />
        </View>

        <FlatList
          data={shippingList}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ padding: 8 }}
          renderItem={({ item }) => (
            <View style={styles.shippingItemContainer}>
              <View style={{ flex: 1 }}>
                <MediumText
                  textToShow={item.shippingName}
                  textCustomStyle={{ marginBottom: 0 }}
                />
                <SmallText
                  textToShow={item.terms}
                  textCustomStyle={{ color: Colors.GRAY, marginTop: 0 }}
                />
              </View>
              <CheckBox
                checked={item.isSelected}
                containerStyle={{ paddingRight: 0, marginRight: 0 }}
                checkedColor={Colors.PRIMARY}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={() => currentSelectedShipping(item.id)}
              />
            </View>
          )}
        />

        <View style={styles.saveButtonContainer}>
          <CustomButton textToShow='Save Changes' onPress={() => onSaveShipping()} />
        </View>
      </Modalize>

      <Modal
        isVisible={isShowSuccessModal}
        style={{ margin: 0 }}
        onBackButtonPress={() => { setIsShowSuccessModal(!isShowSuccessModal) }}
        useNativeDriverForBackdrop={true}
      >
        <View style={styles.modalContentMainContainer}>
          <View style={styles.modalContentContainer}>
            <View style={styles.successLottieContainer}>
              <LottieView
                style={{ width:"100%", height:"100%" }}
                autoPlay
                loop
                source={require('../assets/lotties/success.json')}
              />
            </View>
            <LargeText textToShow='Order Placed Successfully' />
            <MediumText
              textToShow='Thank you for your order at Adios. Stay tune on apps to get notify your order.'
              textCustomStyle={styles.successOrderMessage}
            />
            <CustomButton
              textToShow='Back to Home'
              onPress={() => navigateToHome()}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.bottomContainer}>
        <View style={styles.leftBottomContainer}>
          <MediumText
            textToShow='Total Order'
            textCustomStyle={{ marginTop: 0 }}
          />
          <LargeText
            textToShow={`$ ${totalPrice + selectedShipping.deliveryFee + fee.serviceFee}`}
            textCustomStyle={{ marginVertical: 0 }}
          />
        </View>
        <CustomButton
          textToShow={`Buy (${totalQuantity})`}
          buttonCustomStyle={styles.buyButton}
          onPress={() => onClickBuy()}
        />
      </View>
    </View>
  )
}

export default OrderConfirmationScreen