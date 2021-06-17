import React from "react";
import {useState, useEffect} from "react";
import {Image, View, StyleSheet, TouchableOpacity} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { useNavigation } from '@react-navigation/native';

import ExploreScreen from '../screens/main/ExploreScreen'
import FriendsScreen from '../screens/main/FriendsScreen'
import EventManagerScreen from '../screens/main/EventManagerScreen'
import ProfileScreen from '../screens/main/ProfileScreen'
import CreateEvent from "../screens/main/CreateEvent";

import HomeIcon from '../assets/img/icons/HomeIcn.png'
import ProfileIcon from '../assets/img/icons/ProfileIcn.png'
import EventIcon from '../assets/img/icons/EventsIcn.png'
import Avatar from '../assets/img/icons/Avatar-1.png'
import New from '../assets/img/icons/New.png'
import Confirm from '../assets/img/icons/Confirm.png'

import {AuthContext, ButtonContext} from "../components/context";
import setAuthToken from "../components/TokenUpdate";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

const CustomAddButton = ({children, onPress}) => (
    <TouchableOpacity
    onPress={onPress}
    >

            {children}

    </TouchableOpacity>
)

const MainTabScreens = () => {
    const [confirmButton, setConfirmButton] = useState(false);

    //hook para hacer que la imagen que contiene userImage haga re-render cuando obtengamos el link
    const [userImage, setUserImage] = useState (null);

    //updating userImage from ASyinc storage
    useEffect( () => {
        setTimeout(async () => {
            setUserImage(await AsyncStorage.getItem('userImage'));
        })

    }, []);

    const buttonContext = React.useMemo(() => ({
        setConfirmButton:  () => {
            setConfirmButton(true);
        },
        setAddButton: () => {
            setConfirmButton(false);
        },

    }), []);
    return(
        <ButtonContext.Provider value={buttonContext}>
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 90,
                    paddingLeft: 30,
                    paddingRight: 30,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Explore" component={ExploreScreen} options={{
                tabBarIcon: ({focused}) => (
                  <View style={styles.tabContainer}>
                      <Image
                            source={HomeIcon}
                            resizeMode='contain'
                            style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? '#A5A5A5' : '#D6D6D6'
                          }}
                      />
                  </View>
                ),
            }}
            />
            <Tab.Screen name="Friends" component={FriendsScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={styles.tabContainer}>
                        <Image
                            source={ProfileIcon}
                            resizeMode='contain'
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: focused ? '#A5A5A5' : '#D6D6D6'
                            }}
                        />
                    </View>
                ),
            }}
            />
            <Tab.Screen name="Add" component={CreateEvent}options={{
                tabBarButton: (props) => (
                    <TouchableOpacity {...props} onPress={() => {
                        /*
                        if (confirmButton) {
                            setConfirmButton(false);

                        }
                        else
                        {
                            setConfirmButton(true);
                            props.onPress();
                        }
                        */
                        props.onPress();

                    }}/>
                ),
                tabBarIcon: ({focused}) => (
                    <View style={styles.tabContainer}>
                        <Image
                            source={confirmButton ? Confirm : New}
                            resizeMode='contain'
                            style={{
                                width: 23,
                                height: 23,
                            }}
                        />
                    </View>
                ),
            }}
            />
            <Tab.Screen name="Events" component={EventManagerScreen}options={{
                tabBarIcon: ({focused}) => (
                    <View style={styles.tabContainer}>
                        <Image
                            source={EventIcon}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#A5A5A5' : '#D6D6D6'
                            }}
                        />
                    </View>
                ),
            }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}options={{
                tabBarIcon: ({focused}) => (
                    <View style={styles.tabContainer}>
                        <Image
                            source={{uri: 'http://localhost:5000/' + userImage}}
                            resizeMode='contain'
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 50
                                //tintColor: focused ? '#A5A5A5' : '#D6D6D6'
                            }}
                        />
                    </View>
                ),
            }}
            />
        </Tab.Navigator>
        </ButtonContext.Provider>

    );
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: -5,
        },
        shadowOpacity: 0.13,
        shadowRadius: 3.5,
        //revisar la sombra en android que fallara
        elevation: -3,
    },
    tabContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',

    }
});

export default MainTabScreens;
