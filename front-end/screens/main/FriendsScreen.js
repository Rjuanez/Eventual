import React from 'react';
import {useState, useEffect} from "react";
import {SafeAreaView, View, StyleSheet, Text, Button, } from 'react-native';
import axios from "axios";
import BottomPopup from '../../components/BottomPopup'
import {AuthContext} from "../../components/context";


export default function () {
    const { signOut } = React.useContext(AuthContext);
    const [data, setData] = useState([]);
    const [emailIsExisting, setEmailIsExisting] = useState(false);
    const [user, setUser] = useState({})

    let popupRef = React.createRef();

    const onShowPopup = () => {
        popupRef.show();
    }
    const onClosePopup = () => {
        popupRef.close();
    }

    return (
        <View style={styles.container}>
            <View>{emailIsExisting && <Text>Error</Text>}</View>
            <Button
                title="Click Here"
                onPress={() => signOut()}
            />
            <BottomPopup
                ref={(target) => popupRef = target}
                onTouchOutside={onClosePopup}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

