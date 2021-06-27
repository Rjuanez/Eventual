import React from 'react';
import {useState, useEffect} from "react";
import {SafeAreaView, View, StyleSheet, Text, Button, Dimensions} from 'react-native';
import axios from "axios";
import BottomPopup from '../../components/BottomPopup'
import {AuthContext} from "../../components/context";

import FriendComponent from '../../components/FriendComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function () {




    return (
        <SafeAreaView style={styles.container}>
           <FriendComponent/>
           <FriendComponent/>
           <FriendComponent/>
           <FriendComponent/>

            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: windowWidth*0.08,
        justifyContent: 'center'
    }

});

