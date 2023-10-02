import { Dimensions, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { Header } from '../components/Header/Header'
import { Image } from '@rneui/base'
import { MediumText, SmallText } from '../components/Text'
import { CustomButton } from '../components/Button'
import { FeatureList } from '../components/FeatureList'
import Colors from '../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import realm from '../store/realm'
import { useRef } from 'react'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize/lib/Portal'
import LottieView from 'lottie-react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { addUserLoginId } from '../store/redux/actions/userLoginIdAction'
import { addProductCartAmount } from '../store/redux/actions/ProductCartAmountAction'
import Modal from 'react-native-modal'
import ImageZoom from 'react-native-image-pan-zoom'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ProfileScreen = () => {
  const userLoginId = useSelector((store)=> store.userLoginIdReducer.userLoginId)
  const [profile, setProfile] = useState({})
  const [profileImageShow, setProfileImageShow] = useState(false)
  const logoutRef = useRef(null)
  const dispatch = useDispatch()
  const navigation = useNavigation()


  const getProfile = () =>{
    const data = realm.objects("User").filtered(`id== ${userLoginId}`)[0]
    // console.log(data)
    setProfile(data)
  }

  const onClickLogout = () => {
    const dataToRemove = realm.objects('UserLoginId');
    const likedProduct = realm.objects('Product').filtered('isLike == true');

    realm.write(()=> {
      realm.delete(dataToRemove)
      likedProduct.forEach((item) => {
        item.isLike = false;
      })
    })

    dispatch(addUserLoginId(0))
    dispatch(addProductCartAmount(0))

    logoutRef.current?.close()

    navigation.replace('TabGroup');

  }


  useFocusEffect(
    useCallback(() => {
      getProfile()
    },[])
  )
  return (
    <View style={styles.mainContainer}>
      <Header
        textToShow = "Profile"
        isShowRightIcon
        isWhiteTitle
      />
      <View style={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => {
            setProfileImageShow(true)
          }}>
          <Image
            style={styles.profileImage}
            source={{uri: profile.profileImage || 'https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png'}}
          />
          </TouchableOpacity>
          <View style={styles.detailContainer}>
            <MediumText 
              textToShow={`${profile.name}`}
              textCustomStyle={{fontWeight: 'bold', marginBottom:0}} 
            />
            <SmallText textToShow={`${profile.phone}`} />
          </View>
        </View>
        <MediumText textToShow="Account"
          textCustomStyle={styles.featureTitle}/>
        <FeatureList textToShow="Change Profile" name='account-edit'
          type='material-community' onPress={()=> navigation.navigate('Edit')}/>
          <FeatureList textToShow="Change Address" name='address'
          type='entypo' onPress = {() => navigation.navigate("EditAddress")}/>
        <FeatureList textToShow="Change Password" name='shield-alert'
          type='material-community' onPress={() => { navigation.navigate('ChangePassword') }} />
        <MediumText textToShow='General' textCustomStyle={[styles.featureTitle, { marginTop: 16 }]} />
        <FeatureList textToShow="Term and Conditions" name='file'
          type='material-community' />
        <FeatureList textToShow="Privacy Policy" name='file'
          type='material-community' />
        <FeatureList textToShow="Give Rating" name='ribbon'
          type='ionicon' onPress={() => {
            Linking.openURL("https://google.com")
          }}/>
        <CustomButton
            textToShow='Logout'
            buttonCustomStyle={styles.button}
            isShowIcon
            name='logout'
            type='material-community'
            onPress={() => {
              logoutRef.current?.open()
            }}
        />
      </View>
      <Modal isVisible={profileImageShow} onBackButtonPress={() => {setProfileImageShow(false)}} style={{margin: 0, backgroundColor:'black'}}>
        <ImageZoom 
        cropWidth={Dimensions.get('window').width} 
        cropHeight={Dimensions.get('window').height}
        imageWidth={Dimensions.get('window').width} 
        imageHeight={Dimensions.get('window').width}
        >
          <Image style={{width:"100%",height:"100%"}} source={{uri: profile.profileImage || 'https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png'}}/>
        </ImageZoom>
      </Modal>
      <Portal>
        <Modalize ref={logoutRef} adjustToContentHeight>
          <View style={styles.logoutContentContainer}>
            <MediumText textToShow="Are you sure want to log out?" />
            <View style={styles.lottieContainer}>
              <LottieView 
                autoPlay
                loop
                style={{height:"100%", width:"100%"}}
                source={require("../assets/lotties/logout-lottie.json")}
              />
            </View>
            <View style={styles.logoutButtonContainer}>
              <CustomButton textToShow="NO" 
                buttonCustomStyle={styles.noButton}
                textCustomStyle = {styles.noText}
                onPress={() => {
                  logoutRef.current?.close()
                }}
              />
              <CustomButton textToShow="YES"
                buttonCustomStyle={styles.yesButton}
                onPress={onClickLogout}
              />
            </View>
          </View>
        </Modalize>
      </Portal>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  lottieContainer: {
    width: '50%',
    height: 150,
    },
  mainContainer: {
      flex: 1,
  },
  contentContainer: {
      flex: 1,
      margin: 16,
  },
  profileContainer: {
      flexDirection: 'row',
      borderRadius: 8,
      borderWidth: 1,
      padding: 8,
      borderColor: Colors.BORDER_COLOR,
  },
  profileImage: {
      width: 70,
      height: 70,
      borderRadius: 100,
  },
  detailContainer: {
      marginLeft: 16,
  },
  featureTitle: {
      fontWeight: 'bold',
      marginBottom: 0
  },
  button: {
      marginTop: 16,
  },
  logoutContentContainer: {
    padding: 16,
    alignItems: 'center',
    },
    logoutButtonContainer: {
    flexDirection: 'row',
    flex: 1,
    },
    noButton: {
    flex: 1,
    margin: 8,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    },
    yesButton: {
    flex: 1,
    margin: 8,
    },
    noText: {
    color: Colors.BLACK,
    },
});