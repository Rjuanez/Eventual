import React from 'react';
import {useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Modal,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import Wine from "../assets/img/markers/icons/wine.png";
import Ticket from "../assets/img/markers/icons/ticket.png";
import Ball from "../assets/img/markers/icons/ball.png";


function ButtonIcn({type, onPress}) {
    return (
        <TouchableOpacity style={styles.iconSelector}
                          onPress={onPress}
        >
            <Image source={type} style={styles.icon}/>
        </TouchableOpacity>
    );
}

export default class IconSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        modalVisible: false,
        type: 'Ocio'
        }
    }

    setIcon = (type) => {
        switch (type) {
            case 'Ocio':
                return Wine;
            case 'Cultura':
                return Ticket;
            case 'Deporte':
                return Ball;
        }
    }

    buttonHandler (e) {
        this.setState({
            type: e,
            modalVisible: false,

        });
        this.props.onChange(e);
    }

    render() {
        return (
            <>
                <ButtonIcn type={this.setIcon(this.state.type)} onPress={() => this.setState({
                    ...this.state,
                    modalVisible: true,
                })}/>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Select a type</Text>
                            <View style={{flexDirection: 'row', alignItems: 'space-between'}}>
                                <ButtonIcn type={Wine} onPress={() => this.buttonHandler("Ocio")}/>
                                <View style={{width: 10, height: '100%'}}/>
                                <ButtonIcn type={Ball} onPress={() => this.buttonHandler("Deporte")}/>
                                <View style={{width: 10, height: '100%'}}/>
                                <ButtonIcn type={Ticket} onPress={() => this.buttonHandler("Cultura")}/>
                            </View>

                        </View>
                    </View>
                </Modal>
            </>


        );
    }
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    icon: {
        width: '70%',
        height: '70%'
    },
    iconSelector: {
        backgroundColor: 'rgba(0,0,0,0.07)',
        color: 'rgba(0,0,0,0.02)',
        height: windowWidth*0.13,
        width: windowWidth*0.13,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    centeredView: {
        backgroundColor: 'rgba(0,0,0,0.32)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
        fontWeight: '600'
    }

});
