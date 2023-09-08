import {StyleSheet} from 'react-native'
import Colors from '../constants/Colors'

export const styles = StyleSheet.create({
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
    flatListContainer: {
      margin: 16,
      borderColor: Colors.BORDER_COLOR,
      borderWidth: 1,
      borderRadius: 8,
      paddingBottom: 8,
    },
    listTitleContainer: {
      marginHorizontal: 16,
      marginTop: 8,
    },
    listTitle: {
      fontWeight: 'bold',
      color: Colors.GRAY,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16,
    },
    image: {
      width: 100,
      height: 100,
      borderWidth: 1,
      borderColor: Colors.BORDER_COLOR,
      borderRadius: 5,
    },
    itemDescriptionContainer: {
      marginHorizontal: 8,
      flex: 1,
    },
    orderSummaryContainer: {
      borderColor: Colors.BORDER_COLOR,
      borderWidth: 1,
      borderRadius: 8,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 16,
    },
    summaryListContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    shippingTitleContainer: {
      margin: 16,
      marginBottom: 0,
      alignItems: 'center',
    },
    shippingItemContainer: {
      margin: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: Colors.BORDER_COLOR,
    },
    saveButtonContainer: {
      margin: 16,
      marginTop: 0,
    },
    modalContentMainContainer: {
      backgroundColor: Colors.WHITE,
      flex: 1,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContentContainer: {
      width: '80%',
      alignItems: 'center',
    },
    successLottieContainer: {
      height: 150,
      width: '100%',
    },
    successOrderMessage: {
      textAlign: 'center',
      color: Colors.GRAY
    },
  })