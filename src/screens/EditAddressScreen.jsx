import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '../components/Header/Header'
import { useSelector } from 'react-redux'
import { Formik } from 'formik'
import { SmallText } from '../components/Text'
import { TextInput } from 'react-native-gesture-handler'
import { CustomButton } from '../components/Button'
import { useState, useCallback } from 'react';
import * as yup from 'yup';
import realm from '../store/realm'
import { copyObject } from '../utils/copyData'
import { useFocusEffect } from '@react-navigation/native'

const EditAddressScreen = () => {
    const { userLoginId } = useSelector((store) => store.userLoginIdReducer)
    const [user, setUser] = useState([])
    const validateEditAddressForm = yup.object().shape({
        address: yup
            .string()
            .trim()
            .required('Address is required')
    });

    const getUser = () => {
        const user = realm.objects('User').filtered(`id == ${userLoginId}`)[0]
        const copiedUser = copyObject(user)
        setUser(copiedUser)
    };

    useFocusEffect(
        useCallback(
            () => {
                getUser();
            }, []));

    return (
        <View style={{ flex: 1 }}>
            <Header
                isStackScreen
                isWhiteTitle
                textToShow='Edit Address'
            />
            <Formik
                initialValues={user}
                enableReinitialize
                validationSchema={validateEditAddressForm}
                onSubmit={(data) => console.log(data)}
            >
                {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    values,
                }) => (
                    <View style={styles.contentContainer}>
                        <SmallText textToShow='Address' />
                        <TextInput
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            placeholder='Enter your address'
                            style={styles.input}
                            value={values?.address}
                            multiline
                        />
                        {errors.address && touched.address ?
                            <SmallText
                                textToShow={errors.address}
                                textCustomStyle={styles.errorMessage}
                            />
                            :
                            null
                        }
                        <CustomButton
                            textToShow='Save Address'
                            buttonCustomStyle={styles.saveButton}
                            onPress={handleSubmit}
                        />
                    </View>
                )}

            </Formik>
        </View>
    )
}

export default EditAddressScreen

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 8,
        paddingHorizontal: 16,
    },
    input: {
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
        marginTop: 0,
        fontSize: 14,
        height: 200,
        textAlignVertical: 'top',
    },
    saveButton: {
        marginTop: 16,
    },
})