import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { Header } from '../components/Header/Header'
import { FilterButton } from '../components/Button'
import Colors from '../constants/Colors'
import realm from '../store/realm'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Product from '../components/Product'
import { ModalizeFilterList } from '../components/Modalize'
import { MediumText } from '../components/Text'
import { CheckBox } from '@rneui/themed'
import { addBrandFilter, addCategoryFilter, addGenderFilter, addSortBy } from '../store/redux/actions/productFilterAction';
import { useDispatch, useSelector } from 'react-redux';
import { ToastAndroid } from 'react-native';
import LottieView from 'lottie-react-native'
import { generateId } from '../utils/generateId'
import { sortByData } from '../data/sortByData'

const ProductListScreen = () => {
    const route = useRoute()
    const { basedOnId, basedOnName, basedOnAny } = route.params
    const navigation = useNavigation()
    const genderModalizeRef = useRef(null);
    const categoryModalizeRef = useRef(null);
    const brandModalizeRef = useRef(null);
    const sortByModalizeRef = useRef(null)
    const [genderTagText, setGenderTagText] = useState('Gender');
    const [categoryTagText, setCategoryTagText] = useState('Categories');
    const [brandTagText, setBrandTagText] = useState('Brands');
    const [sortByTagText, setSortByTagText] = useState('Sort By')
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [sortByList, setSortByList] = useState(sortByData)
    const [genders, setGenders] = useState([{ genderName: "Men" }, { genderName: "Women" }])
    const dispatch = useDispatch()
    const { genderId, categoryId, brandId, sortById } = useSelector((store) => store.productFilterReducer);
    const { userLoginId } = useSelector((store) => store.userLoginIdReducer)
    const categoricalData = {
        Gender: {
            realmObjectName: "Gender",
            dataState: genders,
            setStateAction: setGenders,
            setTagTextAction: setGenderTagText,
            globalStateAction: addGenderFilter,
        },
        Brand: {
            realmObjectName: "Brand",
            dataState: brands,
            setStateAction: setBrands,
            setTagTextAction: setBrandTagText,
            globalStateAction: addBrandFilter
        },
        Category: {
            realmObjectName: "Category",
            dataState: categories,
            setStateAction: setCategories,
            setTagTextAction: setCategoryTagText,
            globalStateAction: addCategoryFilter
        },
    }

    const modalizeTypes = {
        Gender: genderModalizeRef,
        Category: categoryModalizeRef,
        Brand: brandModalizeRef,
        SortBy: sortByModalizeRef
    }

    const firstFilter = () => {
        const result = realm.objects('Product').filtered(`id${basedOnAny} == ${basedOnId}`);
        return result;
    };

    const getCategoricalData = (basedOn) => {
        const { realmObjectName, setStateAction } = categoricalData[basedOn]
        const dataDB = realm.objects(realmObjectName);
        setStateAction(dataDB);
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

        if (sortById > 0) {
            const selectedSortBy = sortByList.find(({ isSelected }) => isSelected);
            if (selectedSortBy) {
                productsDB = productsDB.sorted(selectedSortBy.basedOn, selectedSortBy.isReverse);
            }
        }

        setProducts(productsDB);
    };

    const resetCategoricalData = (basedOn) => {
        const { realmObjectName, globalStateAction } = categoricalData[basedOn]
        const dataDB = realm.objects(realmObjectName)
        realm.write(() => {
            dataDB.forEach((item) => {
                item.isSelected = false
            })
        }
        )
        dispatch(globalStateAction(0))
    }

    const resetSortBy = () => {
        const result = sortByData.map((item) => {
            item.isSelected = false

            return item
        })
        console.log(result)
        setSortByList(result)
        dispatch(addSortBy(0))
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

    const onSelectCategorical = (selectedId, selectedCategorical) => {
        updateSelectedStatus(selectedCategorical, selectedId);
        getCategoricalData(selectedCategorical);
    };

    const onApplyCategorical = (selectedCategorical) => {
        const { dataState, setTagTextAction, globalStateAction } = categoricalData[selectedCategorical]
        const tagLabel = { Gender: 'genderName', Brand: 'brandName', Category: 'shoeCategory' }
        const selectedData = dataState.find(({ isSelected }) => isSelected);

        if (selectedData) {
            setTagTextAction(selectedData[tagLabel[selectedCategorical]]);
            dispatch(globalStateAction(selectedData.id));
            closeModalize(selectedCategorical)
        } else {
            ToastAndroid.show(`Please select ${selectedCategorical.toLowerCase()} first!`, ToastAndroid.SHORT);
        }
    };

    const onApplySortBy = () => {
        const selectedSortBy = sortByData.find(({ isSelected }) => isSelected);

        if (selectedSortBy) {
            setSortByTagText(selectedSortBy.name);
            dispatch((addSortBy(selectedSortBy.id)));
            closeModalize('SortBy');
        } else {
            ToastAndroid.show('Please select sort by first!', ToastAndroid.SHORT);
        }
    };

    const onClickResetCategorical = (selectedCategorical) => {
        const { setTagTextAction } = categoricalData[selectedCategorical]
        resetCategoricalData(selectedCategorical)
        closeModalize(selectedCategorical)
        setTagTextAction(selectedCategorical)
    }

    const onClickResetSortBy = () => {
        resetSortBy()
        closeModalize('SortBy')
        setSortByTagText('Sort By')
    }

    const onSelectSortBy = (selectedId) => {
        const updatedSortByList = sortByList.map((item) => {
            item.isSelected = item?.id === selectedId

            return item;
        })

        setSortByList(updatedSortByList);
    };

    const onClickHeart = (productId, currentLikeStatus) => {
        if (userLoginId != 0) {
            const product = realm.objects('Product').filtered(`id == ${productId}`)[0]
            realm.write(() => {
                product.isLike = !currentLikeStatus
            })

            getProducts()

            const favoriteList = realm.objects('FavoriteProduct').filtered(`idUser == ${userLoginId}`)[0]
            if (favoriteList) {
                const isProductExist = favoriteList.idProducts.has(productId)

                realm.write(() => {
                    if (isProductExist) {
                        favoriteList.idProducts.delete(productId)
                    } else {
                        favoriteList.idProducts.add(productId)
                    }
                })

            } else {
                const newId = generateId('FavoriteProduct')

                realm.write(() => {
                    realm.create('FavoriteProduct', {
                        id: newId,
                        idUser: userLoginId,
                        idProducts: [productId]
                    })
                })
            }
        } else {
            navigation.navigate('Login')
        }
    }



    useEffect(() => {
        const categorical = ['Gender', 'Category', "Brand"]
        categorical.forEach((item) => {
            resetCategoricalData(item)
            getCategoricalData(item)
        })
        resetSortBy()
    }, [])

    useFocusEffect(
        useCallback(
            () => {
                getProducts()
            },
            [genderId, categoryId, brandId, sortById]
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
            <ScrollView style={{ height: 90 }}
                horizontal>

                <View style={styles.filterMenuContainer}>
                    <FilterButton textToShow={`${sortByTagText}`}
                        onPress={() => showModalize('SortBy')}
                        buttonCustomStyle={{ backgroundColor: sortById != 0 ? Colors.PRIMARY : null }}
                        textCustomStyle={{ color: sortById != 0 ? 'white' : 'black' }}
                        iconColor={sortById != 0 ? 'white' : 'black'}
                    />
                    <FilterButton textToShow={`${categoryTagText}`}
                        onPress={() => showModalize('Category')}
                        buttonCustomStyle={{ backgroundColor: categoryId != 0 ? Colors.PRIMARY : null }}
                        textCustomStyle={{ color: categoryId != 0 ? 'white' : 'black' }}
                        iconColor={categoryId != 0 ? 'white' : 'black'} />
                    {
                        basedOnAny !== 'Brand' ?
                            <FilterButton textToShow={`${brandTagText}`}
                                onPress={() => showModalize('Brand')}
                                buttonCustomStyle={{ backgroundColor: brandId != 0 ? Colors.PRIMARY : null }}
                                textCustomStyle={{ color: brandId != 0 ? 'white' : 'black' }}
                                iconColor={brandId != 0 ? 'white' : 'black'} />
                            :
                            <FilterButton textToShow={`${genderTagText}`}
                                onPress={() => showModalize('Gender')}
                                buttonCustomStyle={{ backgroundColor: genderId != 0 ? Colors.PRIMARY : null }}
                                textCustomStyle={{ color: genderId != 0 ? 'white' : 'black' }}
                                iconColor={genderId != 0 ? 'white' : 'black'} />
                    }
                </View>
            </ScrollView>

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
                        isLike={item.isLike}
                        onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
                        onPressHeart={() => onClickHeart(item.id, item.isLike)}
                    />
                )}
            />

            <ModalizeFilterList
                modalizeRef={genderModalizeRef}
                title='Gender'
                onClickApplyFilter={() => onApplyCategorical('Gender')}
                onClickReset={() => onClickResetCategorical('Gender')}
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
                                    onPress={() => onSelectCategorical(item.id, 'Gender')}
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
                modalizeRef={sortByModalizeRef}
                title='Sort By'
                onClickApplyFilter={() => onApplySortBy()}
                onClickReset={() => onClickResetSortBy()}
                list={
                    <FlatList
                        data={sortByData}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        contentContainerStyle={{ padding: 8 }}
                        renderItem={({ item }) => (
                            <View style={styles.filterItemContainer}>
                                <MediumText textToShow={item.name} />
                                <CheckBox
                                    checked={item.isSelected}
                                    onPress={() => onSelectSortBy(item.id)}
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
                onClickApplyFilter={() => onApplyCategorical('Category')}
                onClickReset={() => onClickResetCategorical('Category')}
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
                                    onPress={() => onSelectCategorical(item.id, 'Category')}
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
                onClickApplyFilter={() => onApplyCategorical("Brand")}
                onClickReset={() => onClickResetCategorical("Brand")}
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
                                    onPress={() => onSelectCategorical(item.id, "Brand")}
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
        width: '40%',
        height: 200,
    },
    emptyMessageContainer: {
        position: 'absolute',
        bottom: 10
    }
})