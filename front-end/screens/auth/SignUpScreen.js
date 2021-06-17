import React from 'react';
import { useReducer, useContext} from "react";
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
import FormData from 'form-data'
import SingUpArt from '../../assets/img/SingUpArt.png';
import FilledButton from "../../components/FilledButton";
import PlainInput from "../../components/PlainInput";


import DataPicker from "../../components/DataPicker";
import {AuthContext} from "../../components/context";
import axios from "axios";
import ProfileSelector from "../../components/ProfileSelector";

export default function () {
    //Cargar tipografias (arreglar)
    const [loaded] = useFonts({
        GTAExtended: require('../../assets/fonts/GT-America-Extended-Medium.otf'),
        GTALight: require('../../assets/fonts/GT-America-Light.otf'),
    });

    //Contexto para cambiar variables del inicio de sesion
    const { signIn } = React.useContext(AuthContext);

    //Dispatcher para controlar imputs:
    //  name, lastName, email, password, date, image
    const initialInputState = {
        name: '',
        lastName: '',
        email: '',
        password: '',
        date: '',
        userImage: null
    }

    const inputReducer = (prevState, action) => {
        switch (action.type) {
            case 'Date':
                return {
                    ...prevState,
                    date: action.date,
                };
            case 'Mail':
                return {
                    ...prevState,
                    email: action.email,
                };
            case 'LastName':
                return {
                    ...prevState,
                    lastName: action.lastName,
                };
            case 'Name':
                return {
                    ...prevState,
                    name: action.name,
                };
            case 'Password':
                return {
                    ...prevState,
                    password: action.password,
                };
            case 'Image':
                return {
                    ...prevState,
                    userImage: action.userImage,
                };
        }
    };
    const [inputState, dispatch] = React.useReducer(inputReducer, initialInputState);



    //Entrar en la cuenta si el registro es valido
    async function loginHandle  (inputState)  {
        const credentials = {
            email: inputState.email,
            password: inputState.password,
        }
        await axios.post('http://localhost:5000/user/login', {credentials})
            .then(response => {
                console.log(response);
                signIn(response.data.token, response.data.userImage);
            })
            .catch(error => {
                //console.log(error.response.data);
            });
    }

    //POST para crear usuario
    async function registerHandle  (inputState)  {
        //creamos el formulario con toda la informacion de el registro
        const data = new FormData();
        data.append('name', inputState.name );
        data.append('lastName', inputState.lastName );
        data.append('email', inputState.email );
        data.append('password', inputState.password );
        data.append('birthday', inputState.date.toUTCString() );
        data.append('userImage', {
            //cambiar nombre
            name: 'photo.jpeg',
            type: inputState.userImage.type,
            uri: Platform.OS === 'ios' ? inputState.userImage.uri.replace('file://', '') : photo.uri,
        });

        await axios.post('http://localhost:5000/user/register', data, {
                parseReqBody: false,
                headers: {
                    'content-type': 'multipart/form-data; boundary=multipart-form-boundary'
                }
            }
            )
            .then(response => {
                loginHandle (inputState);
            })
            .catch(error => {
                //console.log(error);
            });

    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container2}>
                    <View style={styles.header}>
                        <Image
                            source={SingUpArt}
                            style={styles.SingUpArt}
                        />
                    </View>
                    <View style={styles.footer}>
                        <ProfileSelector
                            onChange={(val) =>  dispatch({ type: 'Image', userImage: val})}
                        />

                        <View style={styles.nameFields}>
                            <PlainInput
                                title={'Nombre'}
                                style={{ width: '47.5%', marginRight: '5%' }}
                                onChangeText={(val) => dispatch({ type: 'Name', name: val})}
                            />
                            <PlainInput
                                title={'Apellido'}
                                style={{ width: '47.5%'}}
                                onChangeText={(val) => dispatch({ type: 'LastName', lastName: val})}
                            />
                        </View>
                        <PlainInput
                            title={'eMail'}
                            style={styles.input}
                            keyboardType={'email-address'}
                            onChangeText={(val) => dispatch({ type: 'Mail', email: val})}
                        />
                        <PlainInput
                            title={'Contraseña'}
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={(val) => dispatch({ type: 'Password', password: val})}
                        />
                        <DataPicker
                            style={{marginBottom: 20}}
                            onChange = {(val) =>  dispatch({ type: 'Date', date: val})}
                            mode="date"

                        />
                        <FilledButton
                            title={'Continuar'}
                            onPress={() => registerHandle(inputState)}
                        />
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
        flex: 7,
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
    nameFields: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    SingUpArt: {
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
