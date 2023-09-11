import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Header } from '../components/Header/Header'
import { useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import realm from '../store/realm'
import { MediumText, SmallText } from '../components/Text'
import { FlatList } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'
import { Icon, Image } from '@rneui/themed'
import { getProductImage, getProductName, getSelectedSize } from '../utils/getProductInfomation'
import { CustomButton } from '../components/Button'

const OrderHistoryScreen = () => {
    const { userLoginId } = useSelector((store) => store.userLoginIdReducer)
    const [orders, setOrders] = useState([])
    const [orderDetails, setOrderDetails] = useState([])
    const navigation = useNavigation()

    const getUserOrderHistory = () => {
        const orderData = realm.objects('Order').filtered(`idUser == ${userLoginId}`);

        let orderDetailByUser = [];
        orderData.forEach((item) => {
            const orderDetailData = realm.objects('OrderDetail').filtered(`idOrder == ${item.id}`);
            orderDetailByUser = [...orderDetailByUser, ...orderDetailData];
        });

        setOrders(orderData);
        setOrderDetails(orderDetailByUser);
    };

    const dateToString = (dateToConvert) => {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr',
            'May', 'Jun', 'Jul', 'Aug',
            'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const dateToProcess = new Date(dateToConvert);
        const date = dateToProcess.getDate();
        const month = months[dateToProcess.getMonth()];
        const year = dateToProcess.getFullYear();
        const minutes = dateToProcess.getMinutes();
        const hours = dateToProcess.getHours();
        const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;

        return `${month} ${date}, ${year} ${hours}:${minutesFormat}`;
    };

    const onClickBuyAgain = (orderId) => {
        navigation.navigate("Cart", {
            orderId,
            orderDetails
        })
    }

    useFocusEffect(
        useCallback(() => {
            getUserOrderHistory()
        }, [])
    )

    return (
        <View style={{ flex: 1 }}>
            <Header
                textToShow="Order History"
                isShowRightIcon
                isWhiteTitle
            />

            <FlatList
                data={orders}
                contentContainerStyle={{ padding: 8 }}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <View style={styles.lottieContainer}>
                            <LottieView
                                style={{ width: '100%', height: '100%' }}
                                autoPlay
                                loop
                                source={require('../assets/lotties/empty-list.json')}
                            />
                        </View>
                        <View style={styles.emptyMessageContainer}>
                            <MediumText textToShow='No items.' />
                        </View>
                    </View>
                }
                renderItem={({ item: order }) => (
                    <View style={styles.orderContainer}>
                        <View style={styles.orderTopContainer}>
                            <View style={styles.orderTopLeftContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon
                                        name='shopping' type='material-community'
                                        color={Colors.PRIMARY} size={24}
                                    />
                                </View>
                                <View style={styles.infoContainer}>
                                    <SmallText
                                        textToShow={`Ord-${order.id}`}
                                        textCustomStyle={{
                                            marginVertical: 0,
                                            marginBottom: 4
                                        }}
                                    />
                                    <SmallText
                                        textToShow={dateToString(order.date)}
                                        textCustomStyle={{ marginVertical: 0 }}
                                    />
                                </View>
                            </View>
                            <View style={styles.orderTopRightContainer}>
                                <SmallText
                                    textToShow='Done'
                                    textCustomStyle={{ color: Colors.GREEN, marginVertical: 4 }}
                                />
                            </View>
                        </View>
                        <View style={styles.lineBreak} />
                        <FlatList
                            data={orderDetails}
                            scrollEnabled={false}
                            style={{ padding: 8 }}
                            keyExtractor={(orderDetail) => orderDetail.id}
                            renderItem={({ item: orderDetail }) => (
                                <View>
                                    {
                                        orderDetail.idOrder === order.id ?
                                            <View style={styles.orderDetailContainer}>
                                                <Image
                                                    style={styles.productImage}
                                                    source={{ uri: getProductImage(orderDetail.idProduct) }}
                                                />
                                                <View style={styles.productDescriptionContainer}>
                                                    <SmallText textToShow={getProductName(orderDetail.idProduct)} />
                                                    <SmallText
                                                        textToShow={getSelectedSize(orderDetail.idSelectedSize)}
                                                        textCustomStyle={{ marginVertical: 0, color: Colors.GRAY }}
                                                    />
                                                    <SmallText
                                                        textToShow={`${orderDetail.quantity} Products`}
                                                        textCustomStyle={{ color: Colors.GRAY }}
                                                    />
                                                </View>

                                            </View>
                                            :
                                            null
                                    }
                                </View>
                            )}
                        />
                        <View style={styles.bottomContainer}>
                            <View style={styles.bottomLeftContainer}>
                                <SmallText
                                    textToShow='Total Order'
                                    textCustomStyle={{ marginTop: 0, color: Colors.GRAY }}
                                />
                                <SmallText
                                    textToShow={`$ ${order.totalPrice + order.deliveryFee + order.serviceFee}`}
                                    textCustomStyle={{ marginVertical: 0 }}
                                />
                            </View>
                            <CustomButton
                                textToShow="Buy Again"
                                buttonCustomStyle={styles.buttonStyle}
                                onPress = {() => onClickBuyAgain(order.id)}
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
    emptyContainer: {
        alignItems: 'center',
    },
    lottieContainer: {
        width: '40%',
        height: 200,
    },
    emptyMessageContainer: {
        position: 'absolute',
        bottom: 10,
    },
    orderContainer: {
        margin: 8,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 8,
    },
    orderTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 16,
    },
    orderTopLeftContainer: {
        flexDirection: 'row',
    },
    lineBreak: {
        borderBottomWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
    orderTopRightContainer: {
        backgroundColor: Colors.BG_GREEN,
        width: '20%',
        alignItems: 'center',
        borderRadius: 100,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        backgroundColor: Colors.LIGHT_BLUE,
    },
    infoContainer: {
        justifyContent: 'center',
        marginLeft: 8,
    },
    orderDetailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
    },
    productImage: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 5,
    },
    productDescriptionContainer: {
        marginHorizontal: 8,
        flex: 1,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderColor: Colors.BORDER_COLOR,
        borderTopWidth: 1,
        flex: 1,
    },
    bottomLeftContainer: {
        flex: 1,
        marginVertical: 16,
        marginLeft: 16,
    },
    buttonStyle: {
        width: '30%',
        padding: 0,
        marginRight: 16,
    },
}) 