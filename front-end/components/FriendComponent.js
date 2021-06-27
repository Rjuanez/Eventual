import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import {useFonts} from "expo-font";
import testAvatar from '../assets/img/testAvatar.jpg'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ({image, name, friendCommon}) {
    const [loaded] = useFonts({
        GTALight: require('../assets/fonts/GT-America-Light.otf'),
    });
    return (
        <View style={styles.container}>
            <Image source={testAvatar} style={styles.image}/>
            <View style={styles.textContainer}>
                <Text style={styles.text1}>Cecilia U. Stanio</Text>
                <View style={{width: '100%', height: '7%'}}/>
                <Text style={styles.text2}>2 Friends in common</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: windowWidth*0.15,
        width: '100%',
        //backgroundColor: 'blue',
        flexDirection: 'row',
        marginVertical: windowHeight*0.01
    },
    image: {
        height: '100%',
        width: windowWidth*0.15,
        backgroundColor: 'green',
        borderRadius: windowWidth*0.05,
    },
    textContainer:{
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        paddingLeft: '6%',
    },
    text1: {
        fontFamily: 'GTAExtended',
        fontSize: windowWidth* '0.045',
    },
    text2: {
        fontFamily: 'GTAExtended',
        fontSize: windowWidth* '0.03',
        color: '#089E95'
    },
    button: {
        width: windowWidth*0.17,
        height: '40%',
        borderRadius: windowWidth*0.17,
        alignSelf: 'center',
        backgroundColor: '#089E95',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontFamily: 'GTAExtended',
        fontSize: windowWidth* '0.03',

    }
});
