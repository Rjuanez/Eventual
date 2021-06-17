import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

import AuthStackScreens from "./navigation/AuthStackScreens";

import {AuthContext} from "./components/context";
import MainTabScreens from "./navigation/MainTabScreens";

import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from "./components/TokenUpdate";



export default function App() {


  const initialLoginState = {
    isLoading: true,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);



  const authContext = React.useMemo(() => ({
    signIn: async (userToken, userImage) => {

      setAuthToken(userToken);
      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userImage', userImage);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', token: userToken})
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userImage');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT'})
      setAuthToken();
    },

  }), []);

  useEffect( () => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      setAuthToken();
      try {
        userToken = await AsyncStorage.getItem('userToken');
        setAuthToken(userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    })

  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          { loginState.userToken != null ? (
              <MainTabScreens/>
          )
          :
              <AuthStackScreens/>
          }
        </NavigationContainer>
      </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
