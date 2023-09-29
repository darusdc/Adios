import { StyleSheet, Dimensions, View } from 'react-native'
import React from 'react'
import { Image } from '@rneui/themed'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');
const logoSize = width * 0.5;

const SplashScreen = () => {
    const navigation = useNavigation()
    setTimeout(()=>{
        navigation.replace('TabGroup')
    }, 1500)
    return (
        <View style={styles.mainContainer}>
            <Image
                source={require("../assets/images/logo.png")}
                style={styles.logo}
                />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: logoSize,
        height: logoSize,
    },
})