import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Header } from '../components/Header/Header';
import Colors from '../constants/Colors';
import { LargeText, MediumText, SmallText } from '../components/Text';
import { Icon } from '@rneui/themed';
import { CustomButton } from '../components/Button';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import realm from '../store/realm';
import { addUserLoginId } from '../store/redux/actions/userLoginIdAction';
import { useDispatch } from 'react-redux';
import { countProductCart } from '../utils/countProductCart';
import { addProductCartAmount } from '../store/redux/actions/ProductCartAmountAction';



const formValidationSchema = yup.object().shape({
  email: yup.string()
        .email('please enter valid email')
        .required('email is required'),
  password: yup.string()
        .required('Password is required')
})
const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const onClickSubmit = (data) => {
    const userAccount = realm.objects("User").find((item)=> item.email === data.email)
    if (userAccount) {
        if (userAccount.email === data.email && userAccount.password === data.password ){
            realm.write(()=>{
                realm.create('UserLoginId', {
                    userId: userAccount.id
                })
                const favoriteProducts = realm.objects('FavoriteProduct').filtered(`idUser == ${userAccount.id}`)[0];
                if (favoriteProducts){
                    favoriteProducts.idProducts.forEach((item) => {
                        const product = realm.objects('Product').filtered(`id == ${item}`)[0];
                        product.isLike = true;
                    })
                }
            })
            dispatch(addUserLoginId(userAccount.id))
            const countResult = countProductCart(userAccount.id);
            dispatch(addProductCartAmount(countResult));
            navigation.popToTop()
        } else {
            alert('Password is incorrect')
        }
    } else {
        alert('Email address is not registered!');
    }

  }
    return (
        <View style={styles.mainContainer}>
            <Header
                textToShow='Login'
                isStackScreen
                headerCustomStyle={{ backgroundColor: Colors.WHITE }}
            />
            <Formik
                validationSchema={formValidationSchema}
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={onClickSubmit}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    touched
                }) => (
                    <View style={styles.contentContainer}>
                        <LargeText textToShow='Login to your account' />
                        <SmallText textToShow='Please fill out the form below!' />
                        <SmallText textToShow='Email' />
                        <View style={styles.input}>
                            <Icon
                                name='email'
                                type='material-community'
                                color={Colors.GRAY}
                            />
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                placeholder='Email'
                                style={styles.innerInput}
                                placeholderTextColor={Colors.GRAY}
                            />
                        </View>
                        {
                            errors.email && touched.email ?
                                <SmallText
                                    textToShow={errors.email}
                                    textCustomStyle={styles.errorMessage}
                                />
                                :
                                null
                        }
                        <View style={styles.input}>
                          <Icon
                            name='lock'
                            type='material-community'
                            color={Colors.GRAY}
                          />
                          <TextInput
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            placeholder='password'
                            style={styles.innerInput}
                            placeholderTextColor={Colors.GRAY}
                          />

                        </View>
                        {
                            errors.password && touched.password ?
                                <SmallText
                                    textToShow={errors.password}
                                    textCustomStyle={styles.errorMessage}
                                />
                                :
                                null
                        }
                        <View style={styles.bottomContentContainer}>
                            <CustomButton
                                textToShow='Login'
                                buttonCustomStyle={styles.loginButton}
                                onPress={handleSubmit}
                            />
                            <MediumText textToShow='Or' />
                            <View style={styles.questionContainer}>
                                <MediumText textToShow="Don't have an account? " />
                                <TouchableOpacity onPress={() => {navigation.navigate('Register')}}>
                                    <MediumText textToShow='Register' textCustomStyle={styles.registerText} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
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
    innerInput: {
        flex: 1,
        color: Colors.BLACK
    },
    errorMessage: {
        color: 'red',
        marginTop: 0,
    },
    loginButton: {
        marginTop: 16,
    },
    loginText: {
        color: Colors.WHITE,
    },
    bottomContentContainer: {
        alignItems: 'center',
    },
    questionContainer: {
        flexDirection: 'row',
    },
    registerText: {
        color: Colors.PRIMARY,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;