import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import realm from '../store/realm'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { MediumText } from './Text'
import { Icon } from '@rneui/themed'
import Colors from '../constants/Colors'
import styles from '../screens/HomeScreenStyles'

const ProductList = () => {
    const navigation = useNavigation()
    const [genders, setGenders] = useState([])
    const [brands, setBrands] = useState([])

    const onClickMenu = (basedOnId, basedOnName, basedOnAny) => {
        navigation.navigate('ProductList', {
            basedOnId,
            basedOnName,
            basedOnAny,
        });
    };

    const getGenders = () => {
        const gendersDB = realm.objects('Gender')
        setGenders(gendersDB)
    }

    const getBrands = () => {
        const brandsDB = realm.objects('Brand')
        setBrands(brandsDB)
    }

    useEffect(() => {
        getGenders()
        getBrands()
    }, [])

    return (
        <View>
            <FlatList
                data={genders}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={{ padding: 8, paddingTop: 0 }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ margin: 8 }} onPress={() => onClickMenu(item.id, item.genderName, 'Gender')}>
                        <ImageBackground
                            source={{ uri: item.thumbnail }}
                            style={styles.genderImage}
                            imageStyle={{ borderRadius: 5 }}
                        >
                            <View style={styles.genderNameContainer}>
                                <MediumText
                                    textToShow={item.genderName}
                                    textCustomStyle={styles.genderName}
                                />
                                <Icon
                                    name='rightcircle'
                                    type='antdesign'
                                    color={Colors.WHITE}
                                />
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )}
            />

            <MediumText
                textToShow='BEST BRAND DEALS'
                textCustomStyle={styles.brandTitle}
            />
            <FlatList
                data={brands}
                numColumns={3}
                contentContainerStyle={{ padding: 8 }}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ margin: 8 }} onPress={() => onClickMenu(item.id, item.brandName, 'Brand')}>
                        <ImageBackground
                            source={{ uri: item.thumbnail }}
                            style={styles.brandImageBackground}
                            imageStyle={styles.brandImage}
                        >
                            <Image
                                source={{ uri: item.logo }}
                                style={styles.brandLogoImage}
                            />
                        </ImageBackground>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default ProductList