import { Image, View, Alert } from 'react-native'
import React from 'react'
import { Header } from '../components/Header/Header'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import realm from '../store/realm';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox, Icon } from '@rneui/themed';
import Colors from '../constants/Colors';
import { LargeText, MediumText, SmallText } from '../components/Text';
import {
  getProductImage, getProductName,
  getProductPrice, getSelectedSize,
  getProductIsLike,
  getPriceByQuantity
} from '../utils/getProductInfomation';
import { CustomButton } from '../components/Button';
import styles from './CartScreenStyles';
import { countProductCart } from '../utils/countProductCart';
import { addProductCartAmount } from '../store/redux/actions/ProductCartAmountAction';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { userLoginId } = useSelector((store) => store.userLoginIdReducer)
  const [carts, setCarts] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isSelectedExist, setIsSelectedExist] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const updateBadge = () => {
    const countResult = countProductCart(userLoginId)
    dispatch(addProductCartAmount(countResult))
  }

  const setCartToFalse = () => {
    const carts = realm.objects('Cart').filtered(`idUser == ${userLoginId}`);
    realm.write(() => {
      carts.forEach((item) => {
        item.isSelected = false;
      });
    });
  };

  const onChangeQuantity = (cartId, type) => {
    const cart = realm.objects('Cart').filtered(`id == ${cartId}`)[0];
    realm.write(() => {
      if (type === 'increase') {
        cart.quantity++
      } else {
        if (cart.quantity - 1 === 0) {
          Alert.alert(
            "Warning!",
            "Are you sure want to remove this product from cart?",
            [
              {
                text: "Cancel",
                style: 'cancel'
              },
              {
                text: "Sure",
                onPress: () => removeACart(cartId)
              }
            ])
        } else {
          cart.quantity--;
        }
      }
    });
    getCarts();
    updateBadge()
  }

  const onClickDelete = () => {
    Alert.alert(
      "Warning!",
      "Are you sure want to remove all these selected product from cart?",
      [
        {
          text: "Cancel",
          style: 'cancel'
        },
        {
          text: "Sure",
          onPress: () => removeMultipleCart()
        }
      ])
  }

  const removeACart = (cartId) => {
    const cart = realm.objects('Cart').filtered(`id == ${cartId}`)[0];
    realm.write(() => {
      realm.delete(cart);
    });
    getCarts();
    updateBadge();
  };

  const removeMultipleCart = () => {
    const carts = realm.objects('Cart').filtered('isSelected == true');
    realm.write(() => {
      realm.delete(carts);
    });
    setIsSelectedExist(false);
    getCarts();
    updateBadge();
  };


  const getCarts = () => {
    const userCarts = realm.objects('Cart').filtered(`idUser == ${userLoginId}`);
    setCarts(userCarts)
    console.log('----------user carts----------');
    console.log(JSON.stringify(userCarts, null, 2));
    let tempTotalPrice = 0;
    let tempTotalQuantity = 0;
    const selectedCarts = userCarts.filtered(`isSelected == true`);
    setIsSelectAll(userCarts.length === selectedCarts.length);
    if (selectedCarts.length !== 0) {
      selectedCarts.forEach((item) => {
        const priceByQuantity = getPriceByQuantity(item.idProduct, item.quantity)
        tempTotalPrice += priceByQuantity
        tempTotalQuantity += item.quantity
      });
      setIsSelectedExist(true)
    } else {
      setIsSelectedExist(false)
    }
    setTotalPrice(tempTotalPrice)
    setTotalQuantity(tempTotalQuantity)
  }

  const onClickCheckBox = (cartId, currentSelectStatus) => {
    const cart = realm.objects('Cart').filtered(`id == ${cartId}`)[0];
    realm.write(() => {
      cart.isSelected = !currentSelectStatus;
    });
    getCarts();
  };

  const onClickSelectAll = () => {
    const carts = realm.objects('Cart').filtered(`idUser == ${userLoginId}`);

    realm.write(() => {
      if (isSelectAll) {
        carts.forEach((item) => {
          item.isSelected = false;
        });
      } else {
        carts.forEach((item) => {
          item.isSelected = true;
        });
      }
    });
    if (isSelectAll) {
      setIsSelectedExist(false);
    }
    getCarts();
    setIsSelectAll(!isSelectAll);
  };

  useEffect(() => {
    setCartToFalse()
    getCarts()
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Header
        isStackScreen
        isWhiteTitle
        textToShow="Cart"
      />

      {isSelectedExist ?
        <View style={styles.topContainer}>
          <View style={styles.innerTopContainer}>
            <View style={styles.innerTopLeftContainer}>
              <CheckBox
                containerStyle={styles.checkBoxContainer}
                checkedColor={Colors.PRIMARY}
                onPress={() => onClickSelectAll()}
                checked={isSelectAll}
              />
              <MediumText textToShow={isSelectAll ? 'Unselect All' : 'Select All'} />
            </View>
            <TouchableOpacity onPress={() => onClickDelete()}>
              <MediumText
                textToShow='Delete'
                textCustomStyle={styles.deleteText}
              />
            </TouchableOpacity>
          </View>
        </View>
        :
        null
      }

      <FlatList
        data={carts}
        contentContainerStyle={{ padding: 8 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemTopContainer}>
              <CheckBox
                checked={item.isSelected}
                containerStyle={styles.checkBoxContainer}
                checkedColor={Colors.PRIMARY}
                onPress={() => onClickCheckBox(item.id, item.isSelected)}
              />
              <Image
                style={styles.itemImage}
                source={{ uri: getProductImage(item.idProduct) }}
              />
              <View style={styles.itemDescriptionContainer}>
                <SmallText textToShow={getProductName(item.idProduct)} />
                <SmallText
                  textToShow={getSelectedSize(item.idSelectedSize)}
                  textCustomStyle={{ marginVertical: 0 }}
                />
                <SmallText textToShow={'$ ' + getProductPrice(item.idProduct)} />
              </View>
            </View>
            <View style={styles.itemBottomContainer}>
              <Icon
                name='cards-heart'
                type='material-community'
                color={getProductIsLike(item.idProduct) ? 'red' : Colors.GRAY}
              />
              <View style={styles.changeQuantityContainer}>
                <TouchableOpacity style={styles.changeQuantityButton} onPress={() => onChangeQuantity(item.id, "decrease")}>
                  <Icon
                    name='minus-thick'
                    type='material-community'
                    color={Colors.PRIMARY}
                    size={16}
                  />
                </TouchableOpacity>
                <LargeText
                  textToShow={item.quantity.toString()}
                  textCustomStyle={styles.quantityText}
                />
                <TouchableOpacity style={styles.changeQuantityButton} onPress={() => onChangeQuantity(item.id, "increase")}>
                  <Icon
                    name='plus-thick'
                    type='material-community'
                    color={Colors.PRIMARY}
                    size={16}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.lottieContainer}>
              <LottieView
                autoPlay
                loop
                style={{width:"100%", height:"100%"}}
                source={require("../assets/lotties/empty-cart.json")} />
            </View>
            <View style={styles.emptyMessageContainer}>
              <MediumText textToShow='Your cart is empty!' />
            </View>
          </View>
        }
      />
      {carts.length ?
        <View style={styles.bottomContainer}>
          <View style={styles.leftBottomContainer}>
            <MediumText
              textToShow='Total Price'
              textCustomStyle={{ marginTop: 0 }}
            />
            <LargeText
              textToShow={`$ ${totalPrice}`}
              textCustomStyle={{ marginVertical: 0 }}
            />
          </View>
          <CustomButton
            textToShow={`Buy (${totalQuantity})`}
            buttonCustomStyle={[styles.buyButton, {backgroundColor: isSelectedExist ? Colors.PRIMARY : Colors.GRAY}]}
            disabled = {totalQuantity < 1 ? true : false}
            onPress = { () => {navigation.navigate('OrderConfirmation', {totalPrice, totalQuantity})}}
          />
        </View> :
        null}
    </View>
  )
}

export default CartScreen