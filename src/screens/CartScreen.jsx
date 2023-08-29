import { Image, View } from 'react-native'
import React from 'react'
import { Header } from '../components/Header/Header'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import realm from '../store/realm';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox, Icon } from '@rneui/themed';
import Colors from '../constants/Colors';
import { LargeText, MediumText, SmallText } from '../components/Text';
import {
  getProductImage, getProductName,
  getProductPrice, getSelectedSize,
  getProductIsLike
} from '../utils/getProductInfomation';
import { CustomButton } from '../components/Button';
import styles from './CartScreenStyles';

const CartScreen = () => {
  const { userLoginId } = useSelector((store) => store.userLoginIdReducer)
  const [carts, setCarts] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isSelectedExist, setIsSelectedExist] = useState(false);

  const setCartToFalse = () => {
    const carts = realm.objects('Cart').filtered(`idUser == ${userLoginId}`);
    realm.write(() => {
      carts.forEach((item) => {
        item.isSelected = false;
      });
    });
  };

  const getCarts = () => {
    const userCarts = realm.objects('Cart').filtered(`idUser == ${userLoginId}`);
    setCarts(userCarts)
    console.log('----------user carts----------');
    console.log(JSON.stringify(userCarts, null, 2));
  }

  const onClickCheckBox = (cartId, currentSelectStatus) => {
    const cart = realm.objects('Cart').filtered(`id == ${cartId}`)[0];
    realm.write(() => {
      cart.isSelected = !currentSelectStatus;
    });
    getCarts();
    const carts = realm.objects('Cart').filtered(`idUser == ${userLoginId}`);
    const selectedCarts = carts.filtered(`isSelected == true`);
    setIsSelectAll(carts.length === selectedCarts.length);
    if (selectedCarts.length === 0) {
      setIsSelectedExist(false);
    } else {
      setIsSelectedExist(true);
    }
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

      {isSelectedExist?
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
                <TouchableOpacity style={styles.changeQuantityButton}>
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
                <TouchableOpacity style={styles.changeQuantityButton}>
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
        )} />
      <View style={styles.bottomContainer}>
        <View style={styles.leftBottomContainer}>
          <MediumText
            textToShow='Total Price'
            textCustomStyle={{ marginTop: 0 }}
          />
          <LargeText
            textToShow={`$ 0`}
            textCustomStyle={{ marginVertical: 0 }}
          />
        </View>
        <CustomButton
          textToShow={`Buy (0)`}
          buttonCustomStyle={styles.buyButton}
        />
      </View>
    </View>
  )
}

export default CartScreen