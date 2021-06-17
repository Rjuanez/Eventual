import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useFonts} from "expo-font";

export default function ({title, style, onPress}) {
    const [loaded] = useFonts({
        GTALight: require('../assets/fonts/GT-America-Light.otf'),
    });
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={{
                ...styles.text,
                color: title === 'Log In' ? 'black' : 'white'
            }}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#089E95',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 55,

    },
    text: {
        fontFamily: 'GTALight',
        fontSize: 17,

    }

});
