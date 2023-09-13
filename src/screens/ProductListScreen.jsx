import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { Header } from '../components/Header/Header'
import { FilterButton } from '../components/Button'
import Colors from '../constants/Colors'
import realm from '../store/realm'
import { FlatList } from 'react-native-gesture-handler'
import Product from '../components/Product'
import { ModalizeFilterList } from '../components/Modalize'
import { MediumText } from '../components/Text'
import { CheckBox } from '@rneui/themed'
import { addGenderFilter } from '../store/redux/actions/productFilterAction';
import { useDispatch, useSelector } from 'react-redux';
import { ToastAndroid } from 'react-native';

const ProductListScreen = () => {
    const route = useRoute()
    const { basedOnId, basedOnName, basedOnAny } = route.params
    const [genderTagText, setGenderTagText] = useState('Gender');
    const [categoryTagText, setCategoryTagText] = useState('Categories');
    const [brandTagText, setBrandTagText] = useState('Brands');
    const [products, setProducts] = useState([]);
    const navigation = useNavigation()
    const genderModalizeRef = useRef(null);
    const [genders, setGenders] = useState([{genderName:"Men"}, {genderName:"Women"}])
    const dispatch = useDispatch()
    const { genderId } = useSelector((store) => store.productFilterReducer);

    const modalizeTypes = {
        gender: genderModalizeRef,
    }

    const firstFilter = () => {
        const result = realm.objects('Product').filtered(`id${basedOnAny} == ${basedOnId}`);
        return result;
    };

    const getGenders = () => {
        const gendersDB = realm.objects('Gender');
        setGenders(gendersDB);
    };

    const getProducts = () => {
        let productsDB = firstFilter();

        if (genderId !== 0) {
            productsDB = productsDB.filtered(`idGender == ${genderId}`);
            setGenderTagText(genders[genderId-1]?.genderName)
        }

        setProducts(productsDB);
    };

    const showModalize = (type) => {
        modalizeTypes[type].current?.open()
    }

    const closeModalize = (type) => {
        modalizeTypes[type].current?.close()
    }

    const updateSelectedStatus = (tableName, selectedId) => {
        const dataDB = realm.objects(tableName);

        realm.write(() => {
            dataDB.forEach((item) => {
                item.isSelected = item.id === selectedId
            });
        });
    };

    const onSelectGender = (selectedId) => {
        updateSelectedStatus('Gender', selectedId);
        getGenders();
    };

    const onApplyGender = () => {
        const selectedGender = genders.find(({ isSelected }) => isSelected);

        if (selectedGender) {
            setGenderTagText(selectedGender.genderName);
            dispatch(addGenderFilter(selectedGender.id));
            closeModalize('gender')
        } else {
            ToastAndroid.show('Please select gender first!', ToastAndroid.SHORT);
        }
    };

    useEffect(() => {
        getGenders()
    }, [])

    useFocusEffect(
        useCallback(
            () => {
                getProducts()
            },
            [genderId],
        )
    )

    return (
        <View style={{ flex: 1 }}>
            <Header
                isStackScreen
                textToShow={`${basedOnName}`}
                isWhiteTitle
                isShowRightIcon
            />

            <View style={styles.filterMenuContainer}>
                <FilterButton textToShow={`${categoryTagText}`} />
                {
                    basedOnAny === 'brand' ?
                        <FilterButton textToShow={`${brandTagText}`} />
                        :
                        <FilterButton textToShow={`${genderTagText}`}
                            onPress={() => showModalize('gender')} />
                }
            </View>

            <FlatList
                data={products}
                contentContainerStyle={{ padding: 8 }}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <Product
                        productName={item.name}
                        productPrice={item.price}
                        source={{ uri: item.images[0].link }}
                        isLikeStatus={item.isLike}
                        onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
                    />
                )}
            />

            <ModalizeFilterList
                modalizeRef={genderModalizeRef}
                title='Gender'
                onClickApplyFilter={() => onApplyGender()}
                list={
                    <FlatList
                        data={genders}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        contentContainerStyle={{ padding: 8 }}
                        renderItem={({ item }) => (
                            <View style={styles.filterItemContainer}>
                                <MediumText textToShow={item.genderName} />
                                <CheckBox
                                    checked={item.isSelected}
                                    onPress={() => onSelectGender(item.id)}
                                    containerStyle={{ padding: 0, marginRight: 0 }}
                                    checkedColor={Colors.PRIMARY}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                />
                            </View>
                        )}
                    />
                }
            />
        </View>
    )
}

export default ProductListScreen

const styles = StyleSheet.create({
    filterMenuContainer: {
        padding: 8,
        borderBottomWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        flexDirection: 'row',
    },
    filterItemContainer: {
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
})