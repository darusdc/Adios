import { StyleSheet, Image, View } from 'react-native'
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
                  textToShow={item.quantity}
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

const styles = StyleSheet.create({
  checkBoxContainer: {
    padding: 0,
    margin: 0,
    marginLeft: 0,
  },
  itemContainer: {
    margin: 8,
    borderBottomWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  },
  itemTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemBottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  changeQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeQuantityButton: {
    width: 35,
    height: 35,
    borderRadius: 100,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    marginVertical: 0,
    marginHorizontal: 8
  },
  itemImage: {
    width: 100,
    height: 100,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    borderRadius: 5,
  },
  itemDescriptionContainer: {
    marginHorizontal: 8,
    flex: 1,
  },
  bottomContainer: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    borderColor: Colors.BORDER_COLOR,
    borderTopWidth: 1,
  },
  leftBottomContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  buyButton: {
    width: '30%',
    padding: 4,
    marginHorizontal: 8,
  },
  topContainer: {
    borderColor: Colors.BORDER_COLOR,
    borderBottomWidth: 1,
  },
  innerTopContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerTopLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})