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
import { addBrandFilter, addCategoryFilter, addGenderFilter } from '../store/redux/actions/productFilterAction';
import { useDispatch, useSelector } from 'react-redux';
import { ToastAndroid } from 'react-native';
import LottieView from 'lottie-react-native'

const ProductListScreen = () => {
    const route = useRoute()
    const { basedOnId, basedOnName, basedOnAny } = route.params
    const navigation = useNavigation()
    const genderModalizeRef = useRef(null);
    const categoryModalizeRef = useRef(null);
    const brandModalizeRef = useRef(null);
    const [genderTagText, setGenderTagText] = useState('Gender');
    const [categoryTagText, setCategoryTagText] = useState('Categories');
    const [brandTagText, setBrandTagText] = useState('Brands');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [genders, setGenders] = useState([{ genderName: "Men" }, { genderName: "Women" }])
    const dispatch = useDispatch()
    const { genderId, categoryId, brandId } = useSelector((store) => store.productFilterReducer);

    const modalizeTypes = {
        gender: genderModalizeRef,
        category: categoryModalizeRef,
        brand: brandModalizeRef
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

        if (genderId != 0 && categoryId != 0) {
            productsDB = productsDB.filtered(`idGender == ${genderId} AND idCategory == ${categoryId}`);
        } else if (brandId != 0 && categoryId != 0) {
            productsDB = productsDB.filtered(`idBrand == ${brandId} AND idCategory == ${categoryId}`);
        } else if (genderId !== 0) {
            productsDB = productsDB.filtered(`idGender == ${genderId}`);
            // setGenderTagText(genders[genderId - 1]?.genderName)
        } else if (categoryId !== 0) {
            productsDB = productsDB.filtered(`idCategory == ${categoryId}`);
            // setCategoryTagText(categories[categoryId - 1]?.shoeCategory)
        } else if (brandId !== 0) {
            productsDB = productsDB.filtered(`idBrand == ${brandId}`);
            // setBrandTagText(brands[brandId - 1]?.brandName)
        }

        setProducts(productsDB);
    };

    const getCategories = () => {
        const categoriesDB = realm.objects('Category')
        setCategories(categoriesDB)
    }

    const getBrands = () => {
        const brandsDB = realm.objects('Brand');
        setBrands(brandsDB);
    };

    const resetGenders = () => {
        const genderDB = realm.objects('Gender')
        realm.write(() => {
            genderDB.forEach((item) => {
                item.isSelected = false
            })
        }
        )
        dispatch(addGenderFilter(0))
    }

    const resetCategories = () => {
        const categoriesDB = realm.objects('Category')
        realm.write(() => {
            categoriesDB.forEach((item) => {
                item.isSelected = false
            })
        }
        )
        dispatch(addCategoryFilter(0))
    }

    const resetBrands = () => {
        const brandsDB = realm.objects('Brand')
        realm.write(() => {
            brandsDB.forEach((item) => {
                item.isSelected = false
            })
        }
        )
        dispatch(addBrandFilter(0))
    }

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

    const onSelectCategory = (selectedId) => {
        updateSelectedStatus('Category', selectedId);
        getCategories();
    };

    const onSelectBrand = (selectedId) => {
        updateSelectedStatus('Brand', selectedId);
        getBrands();
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

    const onApplyCategory = () => {
        const selectedCategory = categories.find(({ isSelected }) => isSelected);

        if (selectedCategory) {
            setCategoryTagText(selectedCategory.shoeCategory);
            dispatch(addCategoryFilter(selectedCategory.id));
            closeModalize('category')
        } else {
            ToastAndroid.show('Please select category first!', ToastAndroid.SHORT);
        }
    };

    const onApplyBrand = () => {
        const selectedBrand = brands.find(({ isSelected }) => isSelected);

        if (selectedBrand) {
            setBrandTagText(selectedBrand.brandName);
            dispatch(addBrandFilter(selectedBrand.id));
            closeModalize('brand')
        } else {
            ToastAndroid.show('Please select brand first!', ToastAndroid.SHORT);
        }
    };


    const onClickResetGender = () => {
        resetGenders()
        closeModalize('gender')
        setGenderTagText('Genders')
    }

    const onClickResetCategory = () => {
        resetCategories()
        closeModalize('category')
        setCategoryTagText('Categories')
    }

    const onClickResetBrand = () => {
        resetBrands()
        closeModalize('brand')
        setBrandTagText('Brand')
    }

    useEffect(() => {
        resetGenders()
        resetCategories()
        resetBrands()
        getGenders()
        getCategories()
        getBrands()
    }, [])

    useFocusEffect(
        useCallback(
            () => {
                getProducts()
            },
            [genderId, categoryId, brandId],
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
                <FilterButton textToShow={`${categoryTagText}`}
                    onPress={() => showModalize('category')}
                    buttonCustomStyle={{ backgroundColor: categoryId != 0 ? Colors.PRIMARY : null }}
                    textCustomStyle={{ color: categoryId != 0 ? 'white' : 'black' }}
                    iconColor={categoryId != 0 ? 'white' : 'black'} />
                {
                    basedOnAny !== 'Brand' ?
                        <FilterButton textToShow={`${brandTagText}`}
                            onPress={() => showModalize('brand')}
                            buttonCustomStyle={{ backgroundColor: brandId != 0 ? Colors.PRIMARY : null }}
                            textCustomStyle={{ color: brandId != 0 ? 'white' : 'black' }}
                            iconColor={brandId != 0 ? 'white' : 'black'} />
                        :
                        <FilterButton textToShow={`${genderTagText}`}
                            onPress={() => showModalize('gender')}
                            buttonCustomStyle={{ backgroundColor: genderId != 0 ? Colors.PRIMARY : null }}
                            textCustomStyle={{ color: genderId != 0 ? 'white' : 'black' }}
                            iconColor={genderId != 0 ? 'white' : 'black'} />
                }
            </View>

            <FlatList
                data={products}
                contentContainerStyle={{ padding: 8 }}
                keyExtractor={(item) => item.id}
                numColumns={2}
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
                onClickReset={() => onClickResetGender()}
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

            <ModalizeFilterList
                modalizeRef={categoryModalizeRef}
                title='Category'
                onClickApplyFilter={() => onApplyCategory()}
                onClickReset={() => onClickResetCategory()}
                list={
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        contentContainerStyle={{ padding: 8 }}
                        renderItem={({ item }) => (
                            <View style={styles.filterItemContainer}>
                                <MediumText textToShow={item.shoeCategory} />
                                <CheckBox
                                    checked={item.isSelected}
                                    onPress={() => onSelectCategory(item.id)}
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

            <ModalizeFilterList
                modalizeRef={brandModalizeRef}
                title='Brand'
                onClickApplyFilter={() => onApplyBrand()}
                onClickReset={() => onClickResetBrand()}
                list={
                    <FlatList
                        data={brands}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        contentContainerStyle={{ padding: 8 }}
                        renderItem={({ item }) => (
                            <View style={styles.filterItemContainer}>
                                <MediumText textToShow={item.brandName} />
                                <CheckBox
                                    checked={item.isSelected}
                                    onPress={() => onSelectBrand(item.id)}
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
    emptyContainer: {
        alignItems: 'center',
    },
    lottieContainer: {
        width:'40%',
        height: 200,
    },
    emptyMessageContainer: {
        position: 'absolute',
        bottom: 10
    }
})