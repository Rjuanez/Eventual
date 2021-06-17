import React from "react";
import {Modal, Dimensions, TouchableWithoutFeedback, StyleSheet,
View, Text} from "react-native";
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';


const HEIGHT = Dimensions.get("window").height;

export default function  BottomPopup ({active,}) {
    const offset = useSharedValue(0);

        return (
                    <View style={styles.container}>
                        <Text style={{fontSize: 32, margin: 15}}>HOLAAA</Text>
                    </View>
        );

}

const styles = StyleSheet.create({
    container: {
        bottom: -HEIGHT/3,
        position: 'absolute',
        backgroundColor: 'rgb(206,76,76)',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 10,
        height: HEIGHT / 3,
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
});
