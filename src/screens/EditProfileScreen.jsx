import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Formik } from 'formik';
import { CustomButton } from '../components/Button';
import { MediumText, SmallText } from '../components/Text';
import Colors from '../constants/Colors';
import { Icon } from '@rneui/themed';
import { Modalize } from 'react-native-modalize';
import { Header } from '../components/Header/Header';
import realm from '../store/realm';
import { useSelector } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';

const EditProfileScreen = () => {
    const userLoginId = useSelector((store)=> store.userLoginIdReducer.userLoginId)
    const [userProfile, setUserProfile] = useState({})
    const getUserData = () => {
        const data = realm.objects('User').filtered(`id == ${userLoginId}`)[0]
        const {name, email, phone, profileImage} = data
        setUserProfile({name, email, phone, profileImage})
    }
    const editProfileRef = useRef(null)
    const onGalleryClick = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        }).then((image) => {
            setUserProfile({...userProfile,
                profileImage: image.path
            })
            editProfileRef.current?.close()
        }).catch((error) => {
            console.log(error.message)
        })
    }

    const onCameraClick = () => {
        ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: true
        }).then((image) => {
            setUserProfile({...userProfile,
                profileImage: image.path
            })
            editProfileRef.current?.close()
        }).catch((error) => {
            console.log(error.message)
        })
    }

    const onInputChange = (key, value) => {
        setUserProfile({
        ...userProfile,
        [key]: value,
        });
        };

    const onSubmit = (data) => {
        const dataToUpdate = realm.objects('User').filtered(`id == ${userLoginId}`)[0]
        realm.write(() => {
            dataToUpdate.name = data.name,
            dataToUpdate.email = data.email,
            dataToUpdate.phone = data.phone,
            dataToUpdate.profileImage = userProfile.profileImage || ""
        })
    }
    useEffect(() => {
        getUserData()
    } , [])
    return (
        <View style={styles.mainContainer}>
            <Header
                textToShow='Edit Profile'
                isWhiteTitle
                isStackScreen
            />
            <Formik
                initialValues={userProfile}
                enableReinitialize
                onSubmit={(data) => onSubmit(data)}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    touched,
                    values,
                }) => (
                    <View style={styles.contentContainer}>
                        <View style={styles.profileImageContainer}>
                            <Image
                                style={styles.profileImage}
                                source={{ uri: values?.profileImage || 'https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png' }}
                            />
                            <TouchableOpacity
                                onPress = {()=>{
                                    editProfileRef.current?.open()
                                }}>
                                <SmallText
                                    textToShow='Add Profile Picture'
                                    textCustomStyle={styles.addProfileText}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* input name and error message codes */}
                        <SmallText textToShow="Name"/>
                        <View style={styles.input}>
                            <Icon name='person' type='ionicon'/>
                            <TextInput
                                onChangeText={(text) => onInputChange('name',text)}
                                onBlur={handleBlur('name')}
                                placeholder='your name'
                                value={userProfile.name}
                                style={styles.innerInput}
                                placeholderTextColor={Colors.GRAY}
                            />
                        </View>
                        {
                            errors.name && touched.name ? 
                            <SmallText 
                                textToShow={errors.name}
                                textCustomStyle={styles.errorMessage}
                            /> : null
                        }
                        {/* input email and error message codes */}
                        <SmallText textToShow="Email"/>
                        <View style={styles.input}>
                            <Icon name='email' type='material-community'/>
                            <TextInput
                                 onChangeText={(text) => onInputChange('email',text)}
                                onBlur={handleBlur('email')}
                                placeholder='your email'
                                value={values?.email}
                                style={styles.innerInput}
                                placeholderTextColor={Colors.GRAY}
                            />
                        </View>
                        {
                            errors.email && touched.email ? 
                            <SmallText 
                                textToShow={errors.email}
                                textCustomStyle={styles.errorMessage}
                            /> : null
                        }

                        {/* input phone and error message codes */}
                        <SmallText textToShow="Phone"/>
                        <View style={styles.input}>
                            <Icon name='phone' type='material-community'/>
                            <TextInput
                                 onChangeText={(text) => onInputChange('phone',text)}
                                onBlur={handleBlur('phone')}
                                placeholder='your phone'
                                value={values?.phone}
                                style={styles.innerInput}
                                placeholderTextColor={Colors.GRAY}
                            />
                        </View>
                        {
                            errors.phone && touched.phone ? 
                            <SmallText 
                                textToShow={errors.phone}
                                textCustomStyle={styles.errorMessage}
                            /> : null
                        }

                        <CustomButton
                            textToShow='Save Changes'
                            buttonCustomStyle={styles.saveButton}
                            onPress={handleSubmit}
                        />
                    </View>
                )}
            </Formik>

            {/* write your modalize code here */}
            <Modalize ref={editProfileRef} adjustToContentHeight>
                <View style={styles.editProfileContentContainer}>
                    <View style={styles.editProfileButtonContainer}>
                        <CustomButton
                            isShowIcon
                            name='camera'
                            type='material-community'
                            textToShow="Take a Picture"
                            buttonCustomStyle={styles.buttonStyle}
                            onPress = {onCameraClick}
                        />
                    </View>
                    <View style={styles.editProfileButtonContainer}>
                        <CustomButton
                            isShowIcon
                            name='picture'
                            type='antdesign'
                            textToShow="Take from Gallery"
                            buttonCustomStyle={styles.buttonStyle}
                            onPress = {onGalleryClick}
                        />
                    </View>
                </View>
            </Modalize>
        </View >
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        padding: 8,
        paddingHorizontal: 16,
    },
    input: {
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginTop: 0,
        fontSize: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    editProfileContentContainer:{
        flex:1
    },
    editProfileButtonContainer:{
        flexDirection: "column"
    },
    profileImageContainer: {
        alignItems: 'center',
        marginTop: 8,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    addProfileText: {
        color: Colors.PRIMARY,
        fontWeight: '500',
    },
    saveButton: {
        marginTop: 16,
    },
    innerInput: {
        flex: 1,
        color: Colors.BLACK
    }
});

export default EditProfileScreen;