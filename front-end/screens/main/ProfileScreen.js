import React, { useEffect, useRef, useState, createRef } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFonts} from "expo-font";

import {AuthContext} from "../../components/context";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const GooglePlacesInput = () => {
    const [loaded] = useFonts({
        GTAExtended: require('../../assets/fonts/GT-America-Extended-Medium.otf'),
        GTAExtendedItalic: require('../../assets/fonts/GT-America-Extended-Black-Italic.otf'),
        GTALight: require('../../assets/fonts/GT-America-Light.otf'),
    });

    const { signOut } = React.useContext(AuthContext);

    //hook para hacer que la imagen que contiene userImage haga re-render cuando obtengamos el link
    const [userImage, setUserImage] = useState (null);
    const [userName, setUserName] = useState ('');

    //updating userImage from ASyinc storage
    useEffect( () => {
        setTimeout(async () => {
            setUserImage(await AsyncStorage.getItem('userImage'));
            setUserName(await AsyncStorage.getItem('userName'));
            
        })
    }, []);



    return (
        <View style={styles.container}>
            <View style={{
                marginTop: windowHeight*0.12,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
                //backgroundColor: 'blue'
            }}>
                <Image
                    source={{uri: 'http://localhost:5000/' + userImage}}
                    resizeMode='contain'
                    style={{
                        width: windowWidth*0.27,
                        height: windowWidth*0.27,
                        borderRadius: windowWidth*0.3
                                //tintColor: focused ? '#A5A5A5' : '#D6D6D6'
                        }}
                />
                <Text style={styles.text1}>{userName}</Text>

            </View>
            <View style={{
                flex: 2
            }}>
                
                <TouchableOpacity onPress={() => signOut()} style={{
                    width: windowWidth,
                    alignItems: 'center'
                }}>
                <Text style={{
                    color: 'red',
                    fontFamily: 'GTAExtendedItalic',
                    fontSize: windowWidth* '0.04',
                }}>Log Out</Text>
                </TouchableOpacity>
                
            </View>


        </View>
    );
};

export default GooglePlacesInput;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    text1: {
        marginTop: windowHeight*0.03,
        fontFamily: 'GTAExtended',
        fontSize: windowWidth* '0.07',
    },
    text2: {
        marginTop: windowHeight*0.02,
        fontFamily: 'GTAExtended',
        fontSize: windowWidth* '0.06',
    }
});


