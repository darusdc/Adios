import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as yup from 'yup'
import styles from './RegisterScreenStyles'
import { Header } from '../components/Header/Header'
import Colors from '../constants/Colors'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { LargeText, MediumText, SmallText } from '../components/Text'
import { Icon } from '@rneui/base'
import { CustomButton } from '../components/Button'
import realm from '../store/realm'
import { generateId } from '../utils/generateId'
import { useDispatch } from 'react-redux'
import { addUserLoginId } from '../store/redux/actions/userLoginIdAction'

const RegisterScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();

  const validateRegisterForm = yup.object().shape({
    name: yup.string()
          .required('Name is required'),
    email: yup.string()
          .email("Please insert valid email")
          .required("Email is required"),
    phone: yup.string()
          .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'invalid phone number')
          .required("Phone number is required"),
    password: yup.string().required('password is required'),
    passwordConfirmation: yup.string()
          .oneOf([yup.ref('password')], "password didn't match")
          .required("please fill this form"),

  });

  const onClickRegister = (data) => {
    const allUser = realm.objects('User')
    const userAmount = allUser.length

    let isAlreadyRegistered = false
    if (userAmount !== 0) {
      const isEmailExist = allUser.some((item) => item.email === data.email)

      if (isEmailExist) {
        alert('Email has already been taken!')
        isAlreadyRegistered = true
      }
    }

    if (!isAlreadyRegistered){
      const newUserId = generateId('User')
      realm.write(() => {
        realm.create('User',{
          id: newUserId,
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          profileImage: '',
          address: '',
        })
      })

      dispatch(addUserLoginId(newUserId))
      alert('Successfully Register!')
    }
  }
  return (

    <View style={styles.mainContainer}>
      <Header
      textToShow='Create account'
      isStackScreen
      headerCustomStyle={{backgroundColor: Colors.WHITE}}
      />
      <Formik
        initialValues={{
          name:'',
          email:'',
          phone:'',
          password:'',
          passwordConfirmation:'',
        }}
        validationSchema={validateRegisterForm}
        onSubmit={(data) => onClickRegister(data)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched
        }) => (
          <ScrollView style={styles.contentContainer}>
            <LargeText textToShow="Register at Adios:"/>
            <SmallText textToShow="Please fill out the form below!"/>

            <SmallText textToShow="name"/>
            <View style={styles.input}>
              <Icon
              name='account'
              type='material-community'
              color={Colors.GRAY}
              />
              <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder='name'
              style={styles.innerInput}
              placeholderTextColor={Colors.GRAY}/>
            </View>
            {
              errors.name && touched.name ?
              <SmallText 
              textToShow={errors.name}
              textCustomStyle={styles.errorMessage}
              />:
              null
            }

            <SmallText textToShow="email"/>
            <View style={styles.input}>
              <Icon
              name='email'
              type='material-community'
              color={Colors.GRAY}
              />
              <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder='email'
              style={styles.innerInput}
              placeholderTextColor={Colors.GRAY}/>
            </View>
            {
              errors.email && touched.email ?
              <SmallText 
              textToShow={errors.email}
              textCustomStyle={styles.errorMessage}
              />:
              null
            }
            <SmallText textToShow="phone"/>
            <View style={styles.input}>
              <Icon
              name='phone'
              type='material-community'
              color={Colors.GRAY}
              />
              <TextInput
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              placeholder='phone'
              style={styles.innerInput}
              placeholderTextColor={Colors.GRAY}/>
            </View>
            {
              errors.phone && touched.phone ?
              <SmallText 
              textToShow={errors.phone}
              textCustomStyle={styles.errorMessage}
              />:
              null
            }
            <SmallText textToShow="password"/>
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
              placeholderTextColor={Colors.GRAY}/>
            </View>
            {
              errors.password && touched.password ?
              <SmallText 
              textToShow={errors.password}
              textCustomStyle={styles.errorMessage}
              />:
              null
            }
            <SmallText textToShow="password confirmation"/>
            <View style={styles.input}>
              <Icon
              name='lock'
              type='material-community'
              color={Colors.GRAY}
              />
              <TextInput
              onChangeText={handleChange('passwordConfirmation')}
              onBlur={handleBlur('passwordConfirmation')}
              placeholder='password confirmation'
              style={styles.innerInput}
              placeholderTextColor={Colors.GRAY}/>
            </View>
            {
              errors.passwordConfirmation && touched.passwordConfirmation ?
              <SmallText 
              textToShow={errors.passwordConfirmation}
              textCustomStyle={styles.errorMessage}
              />:
              null
            }

            <View style={styles.bottomContentContainer}>
                            
                            <CustomButton
                                textToShow='Register'
                                buttonCustomStyle={styles.registerButton}
                                onPress={handleSubmit}
                            />
                            <MediumText textToShow='Or' />
                            <View style={styles.questionContainer}>
                                <MediumText textToShow='Already have an account? ' />
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <MediumText
                                        textToShow='Login'
                                        textCustomStyle={styles.loginText}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
            
          </ScrollView>
        )
        
        }

      </Formik>
      <Text>RegisterScreen</Text>

    </View>
  )
}

export default RegisterScreen