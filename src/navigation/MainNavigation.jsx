const { NavigationContainer } = require("@react-navigation/native");
const { createStackNavigator } = require("@react-navigation/stack");
const { default: HomeScreen } = require("../screens/HomeScreen");
const { default: LoginScreen } = require("../screens/LoginScreen");
const { default: RegisterScreen} = require("../screens/RegisterScreen");
import Colors from "../constants/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import { TinyText } from "../components/Text";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { addUserLoginId } from "../store/redux/actions/userLoginIdAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import realm from "../store/realm";
import { Host } from "react-native-portalize/lib/Host";
import EditProfileScreen from "../screens/EditProfileScreen";
import FavoriteProductScreen from "../screens/FavoriteProductScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const TabScreenGroup = () => {
    const navigation = useNavigation();
    const userLoginId = useSelector((store) => store.userLoginIdReducer.userLoginId);
    return (
        <Host>
            <Tab.Navigator
                screenOptions={{headerShown: false}}
                sceneContainerStyle={{backgroundColor: Colors.WHITE}}
                initialRouteName="Home"
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({focused}) =>(
                            <Icon
                                name="compass"
                                type="material-community"
                                color={focused ? Colors.PRIMARY : Colors.GRAY}
                            />
                        ),
                        tabBarLabel: ({focused}) => (
                            <TinyText
                                textToShow="Explore"
                                textCustomStyle={{color: focused ? Colors.PRIMARY : Colors.GRAY}}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Favorite"
                    component={FavoriteProductScreen}
                    options={{
                        tabBarIcon: ({focused}) =>(
                            <Icon
                                name="heart-circle-sharp"
                                type="ionicon"
                                color={focused ? Colors.PRIMARY : Colors.GRAY}
                            />
                        ),
                        tabBarLabel: ({focused}) => (
                            <TinyText
                                textToShow="Favorite"
                                textCustomStyle={{color: focused ? Colors.PRIMARY : Colors.GRAY}}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({focused}) =>(
                            <Icon
                                name="person"
                                type="material-icon"
                                color={focused ? Colors.PRIMARY : Colors.GRAY}
                            />
                        ),
                        tabBarLabel: ({focused}) => (
                            <TinyText
                                textToShow="Profile"
                                textCustomStyle={{color: focused ? Colors.PRIMARY : Colors.GRAY}}
                            />
                        )
                    }}
                    listeners={() => ({
                        tabPress: (e) => {
                        if (userLoginId === 0 ) {
                        e.preventDefault();
                        navigation.navigate('Login');
                        }
                        },
                        })}
                />

            </Tab.Navigator>
        </Host>
    )
}
const MainNavigation = () => {
    const dispatch = useDispatch()
    const globalUserLoginId = useSelector((store) => store.userLoginIdReducer.userLoginId)

    const setUserLoginId = () => {
        const data = realm.objects('UserLoginId')[0]

        if (data?.userId){
            dispatch(addUserLoginId(data.userId))
        }

    }

    useEffect(()=>{
        setUserLoginId()
        console.log('user login id: ', globalUserLoginId)
    },[globalUserLoginId])

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                cardStyle: {
                backgroundColor: Colors.WHITE,
                }
                }}>

                <Stack.Screen name="TabGroup" component={TabScreenGroup}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
                <Stack.Screen name="Cart" component={CartScreen}/>
                <Stack.Screen name="Edit" component={EditProfileScreen}/>
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default MainNavigation