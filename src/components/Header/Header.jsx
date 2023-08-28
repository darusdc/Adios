import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Colors from '../../constants/Colors';
import { Icon } from '@rneui/themed';
import { LargeText, TinyText } from '../Text';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


export const Header = (props) => {
    const {
        headerCustomStyle,
        isShowRightIcon,
        isShowLogo,
        isStackScreen,
        isWhiteTitle,
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
                            onPress={() => {navigation.canGoBack? navigation.goBack():navigation.navigate("Home")}}>
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

                            { productCartAmount !== 0 ?
                            <View style={styles.badgeContainer}>
                                <TinyText textCustomStyle={{ color: Colors.WHITE }} textToShow={productCartAmount<100 ? productCartAmount : "99+"}/>
                            </View>
                            :
                            null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconContainer}
                        >
                            <Icon
                                name='search'
                                type='material'
                                color={Colors.WHITE}
                            />
                        </TouchableOpacity>
                    </View>
                    :
                    null
            }
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.PRIMARY,
        height: 60,
        justifyContent: 'space-between',
    },
    leftContainer: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
    },
    leftText: {
        marginLeft: 8,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
    },
    iconContainer: {
        padding: 8,
    },
    logo: {
        width: 20,
        height: 20,
        marginLeft: 8,
    },
    badgeContainer: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        position: 'absolute',
        
        right: 3,
        top: 3,
        zIndex: 3
    },
});
