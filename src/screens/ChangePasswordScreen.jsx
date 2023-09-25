import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header/Header'
import { Formik } from 'formik'
import { SmallText } from '../components/Text'
import { TextInput } from 'react-native-gesture-handler'
import { Icon } from '@rneui/themed'
import { CustomButton } from '../components/Button'
import * as yup from 'yup';
import Colors from '../constants/Colors'
import { useSelector } from 'react-redux'
import realm from '../store/realm'
import { useNavigation } from '@react-navigation/native'

const ChangePasswordScreen = () => {
    const navigation = useNavigation()
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

    const { userLoginId } = useSelector((store) => store.userLoginIdReducer)
    const [user, setUser] = useState({})

    const getUserAccount = () => {
        const userData = realm.objects("User").filtered(`id == ${userLoginId}`)[0];
        setUser(userData);
    };

    const onClickSave = (data) => {
        if (data.oldPassword === user.password) {
            // will be updated later
            realm.write(() => {
                user.password = data.newPassword
            })
            Alert.alert(
                'Success!',
                `Successfully update your password!`,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.pop(),
                    },
                ]
            );
        } else {
            Alert.alert(
                'Error!',
                `Your current password didn't match!`,
            );
        }
    };

    const validateForm = yup.object().shape({
        oldPassword: yup.string()
            .required('Old password is required'),
        newPassword: yup.string()
            .notOneOf([yup.ref('oldPassword')], "New password same as old password")
            .required('New password is required'),
        confirmNewPassword: yup.string()
            .oneOf([yup.ref('newPassword')], "New password didn't match!")
            .required('New password confirmation is required'),
    });

    useEffect(() => {
        getUserAccount()
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Header textToShow='Change Password'
                isWhiteTitle
                isStackScreen />
            <Formik
                initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    newPasswordConfirmation: ''
                }}
                onSubmit={(data) => { onClickSave(data) }}
                validationSchema={validateForm}
            >
                {({
                    handleBlur, handleChange, handleSubmit, errors, touched, values
                }) => (
                    <View style={styles.contentContainer}>
                        <SmallText textToShow='Old Password' />
                        <View style={styles.input}>
                            <TextInput
                                onChangeText={handleChange('oldPassword')}
                                onBlur={handleBlur('oldPassword')}
                                placeholder='Enter your old password'
                                secureTextEntry={!showOldPassword}
                                style={styles.innerInput}
                                value={values?.oldPassword}
                            />
                            <TouchableOpacity onPress={() => { setShowOldPassword(!showOldPassword) }}>
                                <Icon
                                    name={showOldPassword ? 'eye' : 'eye-off'}
                                    type='ionicon'
                                    color={Colors.GRAY}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.oldPassword && touched.oldPassword ?
                            <SmallText textToShow={errors.oldPassword} textCustomStyle={styles.errorMessage} />
                            : null
                        }

                        <SmallText textToShow='New Password' />
                        <View style={styles.input}>
                            <TextInput
                                onChangeText={handleChange('newPassword')}
                                onBlur={handleBlur('newPassword')}
                                placeholder='Enter your new password'
                                secureTextEntry={!showNewPassword}
                                style={styles.innerInput}
                                value={values?.newPassword}
                            />
                            <TouchableOpacity onPress={() => { setShowNewPassword(!showNewPassword) }}>
                                <Icon
                                    name={showNewPassword ? 'eye' : 'eye-off'}
                                    type='ionicon'
                                    color={Colors.GRAY}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.newPassword && touched.newPassword ?
                            <SmallText textToShow={errors.newPassword} textCustomStyle={styles.errorMessage} />
                            : null
                        }

                        <SmallText textToShow='Confirmation New Password' />
                        <View style={styles.input}>
                            <TextInput
                                onChangeText={handleChange('confirmNewPassword')}
                                onBlur={handleBlur('confirmNewPassword')}
                                placeholder='Enter your new password confirmation'
                                secureTextEntry={!showPasswordConfirmation}
                                style={styles.innerInput}
                                value={values?.confirmNewPassword}
                            />
                            <TouchableOpacity onPress={() => { setShowPasswordConfirmation(!showPasswordConfirmation) }}>
                                <Icon
                                    name={showPasswordConfirmation ? 'eye' : 'eye-off'}
                                    type='ionicon'
                                    color={Colors.GRAY}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmNewPassword && touched.confirmNewPassword ?
                            <SmallText textToShow={errors.confirmNewPassword} textCustomStyle={styles.errorMessage} />
                            : null
                        }

                        <CustomButton textToShow='Save Changes'
                            buttonCustomStyle={styles.saveButton}
                            onPress={handleSubmit} />
                    </View>

                )}
            </Formik>
        </View>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
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
    innerInput: {
        flex: 1,
    },
    errorMessage: {
        color: 'red',
        marginTop: 0,
    },
    contentContainer: {
        flex: 1,
        padding: 8,
        paddingHorizontal: 16,
    },
    saveButton: {
        marginTop: 16,
    },
})