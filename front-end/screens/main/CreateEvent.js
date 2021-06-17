import React from 'react';
import {useEffect, useReducer} from "react";
import {View, StyleSheet, Text, Button, SafeAreaView, TouchableOpacity, Image, Dimensions} from 'react-native';
import {useFonts} from "expo-font";
import PlainInput from "../../components/PlainInput";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import DataPicker from "../../components/DataPicker";
import {ButtonContext} from "../../components/context";
import setAuthToken from "../../components/TokenUpdate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FilledButton from "../../components/FilledButton";
import axios from "axios";
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';
import 'react-native-polyfill';

import Wine from '../../assets/img/markers/icons/wine.png'
import Ball from '../../assets/img/markers/icons/ball.png'
import Ticket from '../../assets/img/markers/icons/ticket.png'
import IconSelector from "../../components/IconSelector";

export default function () {
    const [loaded] = useFonts({
        GTAExtended: require('../../assets/fonts/GT-America-Extended-Medium.otf'),
        GTALight: require('../../assets/fonts/GT-America-Light.otf'),
    });
    const { setConfirmButton } = React.useContext(ButtonContext);

    useEffect( () => {
        //setConfirmButton();
    }, []);

    const initialInputState = {
        name: '',
        description: '',
        location: '',
        lat: 0.0,
        lng: 0.0,
        date: '',
        capacity: '1',
        type: 'Ocio'
    }

    const inputReducer = (prevState, action) => {
        switch (action.type) {
            case 'Name':
                return {
                    ...prevState,
                    name: action.name,
                };
            case 'Description':
                return {
                    ...prevState,
                    description: action.description,
                };
            case 'Location':
                return {
                    ...prevState,
                    location: action.location,

                };
            case 'Date':
                return {
                    ...prevState,
                    date : action.date,

                };
            case 'Hour':
                return {
                    ...prevState,

                };
            case 'Coords':
                return {
                    ...prevState,
                    lat: action.lat,
                    lng: action.lng,
                };
            case 'Type':
                return {
                    ...prevState,
                    type: action.eventType,
                };
        }
    };

    const [inputState, dispatch] = React.useReducer(inputReducer, initialInputState);
    Geocoder.init("AIzaSyDPr4r6el1y3zWzGKzJkQoxSg9AFqk2-Xg");


    async function newEventHandler  (inputState)  {
        const newEvent = {
            name: inputState.name,
            description: inputState.description,
            location: {
                coordinates: {
                    lat: inputState.lat,
                    lng: inputState.lng
                },
            },
            date: inputState.date,
            capacity: '1',
            type: inputState.type,
        }
        //console.log(newEvent);

        await axios.post('http://localhost:5000/event/create', {newEvent})
            .then(response => {
                //console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <SafeAreaView style={styles.container}>
                    <Text style={styles.text1}>Do you want</Text>
                    <Text style={styles.text2}>To meet 'em there?</Text>
                    <Text style={styles.bodyText}>Titulo</Text>
                    <View style={styles.titleRow}>
                        <PlainInput
                            //cambiar autocapitalize
                            title={'About Branding'}
                            style={styles.input2}
                            onChangeText={(val) => {dispatch({ type: 'Name', name: val})}}
                        />
                        <View style={styles.selectorView}>
                            <IconSelector onChange={(val) => {dispatch({ type: 'Type', eventType: val})}}/>
                        </View>

                    </View>

                    <Text style={styles.bodyText}>Descripcion</Text>
                    <PlainInput
                        multiline = {true}
                        title={`El Branding es el proceso de definición y
    construcción de una marca mediante la gestión. `}
                        style={styles.input}
                        onChangeText={(val) => {dispatch({ type: 'Description', description: val})}}
                    />
                    <Text style={styles.bodyText}>Localizacion</Text>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            //console.log(details.description);
                            Geocoder.from(details.description)
                                .then(json => {
                                    var location = json.results[0].geometry.location;
                                    dispatch({ type: 'Coords', lat: location.lat, lng: location.lng});
                                })
                                .catch(error => console.warn(error));
                            //dispatch({ type: 'Location', location: details.description});

                        }}
                        currentLocation = {true}
                        enablePoweredByContainer ={false}
                        styles={{
                            container: {
                                marginLeft:10,
                                marginBottom: 20,
                                flex: 0,
                                width: '100%',
                            },
                        }}
                        query={{
                            key: 'AIzaSyDPr4r6el1y3zWzGKzJkQoxSg9AFqk2-Xg',
                            language: 'en',
                        }}
                    />
                    <View style={styles.timeContainer}>
                        <View style={{marginRight: 10}}>
                            <Text style={styles.dateText}>Dia</Text>
                            <DataPicker
                                style={{marginBottom: 20}}
                                onChange = {(val) => {dispatch({ type: 'Date', date: val})}}
                                mode="date"

                            />
                        </View>
                        <View >
                            <Text style={styles.dateText}>Hora</Text>
                            <DataPicker
                                style={{marginBottom: 20}}
                                onChange = {(val)=>console.log(val)}
                                mode="time"

                            />
                        </View>

                    </View>
                    <FilledButton
                        title={'CREAR'}
                        style={{
                            marginTop: 80,
                            marginLeft: '10%',
                            marginRight: '10%',
                            width: '80%'
                        }}
                        onPress={()=>{newEventHandler(inputState)}}
                    />



                </SafeAreaView>
            </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        //cambiar a tamaños relativos
        marginLeft: 20,
        marginRight: 20,
        marginTop: 100
    },
    titleRow : {

        width: '100%',
        flexDirection: 'row',
    },
    text1: {
        fontFamily: 'GTAExtended',
        fontSize: 32,

    },
    text2: {
        fontFamily: 'GTALight',
        fontSize: 32,
        marginBottom: 30
    },
    bodyText: {
        fontFamily: 'GTALight',
        fontSize: 15,
        marginBottom: 10
    },
    input: {
        marginBottom: 20,
        width: '100%',
        marginLeft:10,
    },
    input2: {
        marginBottom: 20,
        width: '70%',
        marginLeft:10,
    },
    timeContainer: {
        flexDirection: 'row',


    },
    dateText: {
        fontFamily: 'GTALight',
        fontSize: 15,
    },
    selectorView: {
        width: '30%',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },

});

