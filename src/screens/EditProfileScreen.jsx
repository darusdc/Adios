import React, { useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CustomButton } from '../components/Button';
import { MediumText, SmallText } from '../components/Text';
import Colors from '../constants/Colors';
import { Icon } from '@rneui/themed';
import { Modalize } from 'react-native-modalize';
import { Header } from '../components/Header/Header';

const EditProfileScreen = () => {
    const editProfileRef = useRef(null)
    return (
        <View style={styles.mainContainer}>
            <Header
                textToShow='Edit Profile'
                isWhiteTitle
                isStackScreen
            />
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    profileImage: '',
                }}
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
                                source={{ uri: 'https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png' }}
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
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                placeholder='your name'
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
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                placeholder='your email'
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
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                placeholder='your phone'
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
                        />
                    </View>
                    <View style={styles.editProfileButtonContainer}>
                        <CustomButton
                            isShowIcon
                            name='picture'
                            type='antdesign'
                            textToShow="Take from Gallery"
                            buttonCustomStyle={styles.buttonStyle}
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