import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Button} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PropTypes from 'prop-types';

function PickerText(props) {
    if (props.type == "date"){
        if (props.date) {
            var fecha = props.date.getDate().toString() + ", " + (props.date.getMonth() + 1).toString() + ", " + props.date.getFullYear().toString();
            return (<Text style={styles.textActive}>{fecha}</Text>);
        } else {
            return (<Text style={styles.textDisabled}>Pick a date</Text>);
        }
    }
    else {
        if (props.date) {
            var fecha = props.date.getHours().toString() + ':' + props.date.getMinutes().toString();
            return (<Text style={styles.textActive}>{fecha}</Text>);
        } else {
            return (<Text style={styles.textDisabled}>Pick an hour</Text>);
        }
    }

}


export default class CustomText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDatePickerVisible: false,
            date: null,

        }
    }
    showDatePicker = () => {
        this.state.isDatePickerVisible = true;
        this.forceUpdate();
    };

    hideDatePicker = () => {
        this.state.isDatePickerVisible = false;
        this.forceUpdate();
    };

    handleConfirm = (date) => {
        this.state.date = date;
        this.hideDatePicker();
        this.props.onChange(date);
    };

    render() {
        return (
            <View style={[this.props.style, {width: '100%'}]} >
                <TouchableWithoutFeedback onPress={() => this.showDatePicker()} style={{width: '100%'}} >
                    <View style={styles.container}>
                        <PickerText date={this.state.date} type={this.props.mode}/>
                    </View>

                </TouchableWithoutFeedback>

                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode={this.props.mode}
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        width: '100%',

    },
    textDisabled: {
        paddingLeft: 5,
        color: '#B5B5B5',
    },
    textActive: {
        paddingLeft: 5,
        color: 'black',
    },
});
//CustomText.propTypes = { title: PropTypes.string.isRequired, onPress: PropTypes.func.isRequired };
