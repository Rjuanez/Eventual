import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from '../screens/auth/SplashScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

const AuthStack = createStackNavigator();

const  AuthStackScreen = ({navigator}) => (
    <AuthStack.Navigator headerMode ='none'>
        <AuthStack.Screen name = "SplashScreen" component={SplashScreen}/>
        <AuthStack.Screen name = "SignInScreen" component={SignInScreen}/>
        <AuthStack.Screen name = "SignUpScreen" component={SignUpScreen}/>
    </AuthStack.Navigator>
);

export default AuthStackScreen;
