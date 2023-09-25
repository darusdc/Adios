import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Colors from '../../constants/Colors';
import { Icon } from '@rneui/themed';
import { LargeText, TinyText } from '../Text';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import styles from './HeaderStyle';


export const Header = (props) => {
    const {
        headerCustomStyle,
        isShowRightIcon,
        isShowLogo,
        isStackScreen,
        isWhiteTitle,
        isShowSearch=true,
    } = props;

    const { productCartAmount } = useSelector((store) => store.productCartAmountReducer);
    const navigation = useNavigation();
    const userLoginId = useSelector((store) => store.userLoginIdReducer.userLoginId);

    return (
        <View style={[styles.headerContainer, headerCustomStyle]}>
            <View style={styles.leftContainer}>
                {
                    isStackScreen ?
                        <TouchableOpacity
                            onPress={() => { navigation.canGoBack ? navigation.goBack() : navigation.navigate("Home") }}>
                            <Icon
                                name='keyboard-backspace'
                                type='material-community'
                                color={isShowLogo || isWhiteTitle ? Colors.WHITE : Colors.BLACK}
                            />
                        </TouchableOpacity>
                        :
                        null
                }
                {
                    isShowLogo ?
                        <Image
                            style={styles.logo}
                            source={require('../../assets/images/logo.png')}
                        />
                        :
                        null
                }
                <LargeText
                    textCustomStyle={[
                        styles.leftText,
                        {
                            color: isShowLogo || isWhiteTitle ? Colors.WHITE : Colors.BLACK,
                            fontFamily: isShowLogo ? 'Oswald-Medium' : null,
                            marginTop: isShowLogo ? 0 : 8,
                            fontSize: isShowLogo ? 24 : 20,
                        }
                    ]}
                    {...props}
                />


            </View>
            {
                isShowRightIcon ?
                    <View style={styles.rightContainer}>
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => navigation.navigate(userLoginId === 0 ? 'Login' : 'Cart')}
                        >

                            <Icon
                                name='cart-variant'
                                type='material-community'
                                color={Colors.WHITE}
                            />

                            {productCartAmount !== 0 ?
                                <View style={styles.badgeContainer}>
                                    <TinyText textCustomStyle={{ color: Colors.WHITE }} textToShow={productCartAmount < 100 ? productCartAmount.toString() : "99+"} />
                                </View>
                                :
                                null
                            }
                        </TouchableOpacity>
                        {isShowSearch ?
                            <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={() => {
                                    navigation.navigate('Search')
                                }}
                            >
                                <Icon
                                    name='search'
                                    type='material'
                                    color={Colors.WHITE}
                                />
                            </TouchableOpacity>
                    : null}
                    </View>
            :
            null
                    
            }
        </View>
    )
};
