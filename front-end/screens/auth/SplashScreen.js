import React from 'react';
import {View, StyleSheet, Text, Button, Dimensions, Image} from 'react-native';
import { useFonts } from 'expo-font';

import SplashArt from '../../assets/img/SplashArt.png';
import FilledButton from "../../components/FilledButton";

export default function ({navigation}) {
    const [loaded] = useFonts({
        GTAExtended: require('../../assets/fonts/GT-America-Extended-Medium.otf'),
        GTALight: require('../../assets/fonts/GT-America-Light.otf'),
    });
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Hello!</Text>
                <Text style={styles.text}>Meet you there</Text>
            </View>
            <View style={styles.middleLayer}>
                <Image
                source={SplashArt}
                style={styles.splashArt}
                />
            </View>
            <View style={styles.footer}>
                <FilledButton title={'Sign Up'} onPress={() => navigation.navigate('SignUpScreen')} />
                <FilledButton title={'Log In'} style={styles.loginButton} onPress={() => navigation.navigate('SignInScreen')} />
                <Text style={styles.pie}>All rights reserved Eventual</Text>
            </View>
        </View>
    );
}

const {height} = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
        padding: '10%',
        backgroundColor: '#FFFFFF'
    },
    header: {
        flex: 1,
        width: '100%',
        paddingLeft: 0,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    middleLayer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%'

    },
    splashArt: {
        resizeMode: 'stretch',
    },
    text: {
        fontFamily: 'GTAExtended',
        fontSize: 36,
    },
    loginButton: {
        backgroundColor: '#F5F5F5',
        marginTop: 15,
        marginBottom: 25,
    },
    pie: {
        fontFamily: 'GTALight',
        fontSize: 12,
        color: '#888888',

    }

});
