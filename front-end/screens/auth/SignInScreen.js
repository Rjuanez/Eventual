import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    Platform,
    Image
} from 'react-native';
import {useFonts} from "expo-font";

import LogInArt from '../../assets/img/LogInArt.png';
import FilledButton from "../../components/FilledButton";
import PlainInput from "../../components/PlainInput";
import {AuthContext} from "../../components/context";
import axios from "axios";


export default function () {
    //external fonts implementation
    const [loaded] = useFonts({
        GTAExtended: require('../../assets/fonts/GT-America-Extended-Medium.otf'),
        GTALight: require('../../assets/fonts/GT-America-Light.otf'),
    });


    const [data, setData] = React.useState({
       username: '',
       password: '',
    });

    //called when the email field is updated
    const usernameInputChange = (val) => {
        setData({
           ...data,
           username: val,
        });
    }

    //called when the password field is updated
    const passwordInputChange = (val) => {
        setData({
            ...data,
            password: val,
        });
    }

    async function loginHandle  (username, password)  {

        const credentials = {
            email: username,
            password: password,
        }
        await axios.post('http://localhost:5000/user/login', {credentials})
            .then(response => {

                let userName = response.data.name + ' ' + response.data.lastName;
                signIn(response.data.token, response.data.userImage, userName);
            })
            .catch(error => {
                //console.log(error.response.data);
            });
    }

    const {signIn} = React.useContext(AuthContext);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container2}>
                    <View style={styles.header}>
                        <Image
                            source={LogInArt}
                            style={styles.logInArt}
                        />
                    </View>
                    <View style={styles.footer}>
                        <PlainInput
                            title={'eMail'}
                            style={styles.input}
                            keyboardType={'email-address'}
                            onChangeText={(val) => usernameInputChange(val)}
                        />
                        <PlainInput
                            title={'Contraseña'}
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={(val) => passwordInputChange(val)}
                        />
                        <FilledButton title={'Continuar'} onPress={() => {loginHandle(data.username, data.password)}}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>


        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
        padding: '10%',
        backgroundColor: '#FFFFFF'
    },
    container2: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 6,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    footer: {
        flex: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logInArt: {
        resizeMode: 'stretch',
    },
    text: {
        fontFamily: 'GTAExtended',
        fontSize: 28,
    },
    input: {
        marginBottom: 20,
        width: '100%'

    }

});
