import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Dimensions, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from "axios";

import DefaultMarker from '../../assets/img/markers/DefaultMarker.png'
import Wine from '../../assets/img/markers/icons/wine.png'
import Ball from '../../assets/img/markers/icons/ball.png'
import Ticket from '../../assets/img/markers/icons/ticket.png'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

export default function () {
    const [data, setData] = useState([]);
    const cords = {
        latitude: 41.405397528128695,
        longitude: 2.202174811913733
    };

    const onMarkerPress = (markerData) => {
        const markerID = markerData._targetInst.return.key;
        const marker = data.find(marker => marker._id === markerID);
        setslideUpData({title: marker.name, description: marker.description});
        _map.current.animateToRegion(
            {
                latitude: marker.location["coordinates"]["lat"],
                longitude: marker.location["coordinates"]["lng"],
                latitudeDelta: 0.0055,
                longitudeDelta: 0.00521,
            },
            350
        );
        sheetRef.current.snapTo(0);
    }
    //funcion para espeficiccar iconos (Pasar a archivo a parte)
    const setIcon = (type) => {
        switch (type) {
            case 'Ocio':
                return Wine;
            case 'Cultura':
                return Ticket;
            case 'Deporte':
                return Ball;
        }
    }

    //Inicio elementos del slide-up
    const renderInner = () => (
        <View style={panelStyles.container}>
            <Text style ={panelStyles.txtTitle}>{slideUpData.title}</Text>
            <Text style ={panelStyles.txtDescription}>{slideUpData.description}</Text>
        </View>

    );
    const renderHeader = () => (
        <View  style={panelStyles.header}>
            <View style={panelStyles.handle}/>
        </View>
    );

    const sheetRef = React.useRef(null);
    const fall = new Animated.Value(1);

    const [slideUpData, setslideUpData] = useState({title: 'PEPINO', description: 'ASD'});

    //Fin elementos slide-up


    //Descargar markers de base de datos
    useEffect(() => {
        axios.get('http://localhost:5000/event/list')
            .then(function (response) {
                // handle success
                setData(response.data);
                //console.log(data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, []);

    const _map = React.useRef(null);
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[450, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                onPress={() => {sheetRef.current.snapTo(1)}}
                initialRegion={{
                    latitude: cords.latitude,
                    longitude: cords.longitude,
                    latitudeDelta: 0.0055,
                    longitudeDelta: 0.00521,
                }}
            >
                {

                    data.map (datos => {

                    return (
                        <Marker
                            key={datos._id}
                            onPress={(data) => onMarkerPress(data)}
                            coordinate={{
                                latitude: datos.location["coordinates"]["lat"],
                                longitude: datos.location["coordinates"]["lng"],
                            }}
                            anchor={{x: 1.0, y: 1.0}}

                        >
                            <View style={{}}>
                                <Image source={DefaultMarker}/>
                                    <Image source={setIcon(datos.type)} style={styles.markerIcon}/>

                            </View>
                        </Marker>
                    )})}


            </MapView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    markerIcon: {
        height: 30,
        width: 30,
        position: 'absolute',
        left: 7,
        top: 7,
        tintColor: 'white'
    }

});

const panelStyles = StyleSheet.create({
    container : {
        backgroundColor: 'white',
        height: '100%',
        paddingLeft: 20,
        paddingTop: 5,
    },
    header: {
        backgroundColor: 'white',
        width: '100%',
        height: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',

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
    handle: {
        backgroundColor: 'black',
        opacity: 0.4,
        width: 60,
        height: 5,
        borderRadius: 20,
    },
    txtTitle: {
        fontSize: 29,
        color: 'black'
    },
    txtDescription: {
        fontSize: 15,
        fontWeight: "300",
        marginTop: 10,
    }
});

