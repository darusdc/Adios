import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Header } from '../components/Header/Header'
import { SearchBar } from '@rneui/themed'
import Colors from '../constants/Colors'
import ProductList from '../components/ProductList'
import { CustomButton } from '../components/Button'
import { useNavigation } from '@react-navigation/native'

const SearchScreen = () => {
    const navigation = useNavigation()
    const [searchKeyword, setSearchKeyword] = useState("")

    const onClickSearch = () => {
        if (searchKeyword.trim() !== '') {
            navigation.navigate('SearchResult', {searchKeyword})
        }
    };

    return (
        <View>
            <Header isStackScreen isWhiteTitle isShowLogo textToShow="Search" isShowRightIcon isShowSearch={false} />
            <SearchBar placeholder='Search Product' onChangeText={(value) => setSearchKeyword(value)}
                value={searchKeyword}
                containerStyle={{ backgroundColor: 'white', ...styles.searchBarContainer }}
                inputContainerStyle={{ backgroundColor: 'white', ...styles.searchInputContainer }}
                inputStyle={{ backgroundColor: 'white', ...styles.searchInput }}
                returnKeyType='search'
                onSubmitEditing={() => onClickSearch()} />
                {searchKeyword != "" ? 
                <CustomButton
                onPress={() => onClickSearch()} 
                isShowIcon 
                name='search'
                 type='ionicon'
                 color='black' 
                 textToShow="Search Product"
                 buttonCustomStyle={{backgroundColor: 'white', justifyContent: 'left'}} 
                 textCustomStyle={{color:'black'}}/> : <ProductList/>}
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    searchBarContainer: {
        margin: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
    searchInputContainer: {
        height: 30,
    },
    searchInput: {
        fontSize: 14,
        marginLeft: 8,
    },
    lineBreak: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.BORDER_COLOR,
    },
})