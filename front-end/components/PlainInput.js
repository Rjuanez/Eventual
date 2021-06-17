import React from 'react';
import {View, StyleSheet, Text, TextInput, Modal} from 'react-native';

export default function ({title, style, ...props}) {
    return (
        <TextInput
            {...props}
            placeholder={title}
            style={[style, styles.container]}
            autoCapitalize="none"
        />
    );
}

const styles = StyleSheet.create({
    container: {

        padding: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
    },

});
