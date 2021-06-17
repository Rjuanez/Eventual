import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Button, TouchableOpacity,
} from 'react-native';

import * as ImagePicker from "expo-image-picker";
import Avatar from '../assets/img/default_avatar.jpg'
const windowWidth = Dimensions.get('window').width;





export default class ProfileSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        }
    }


    componentDidMount() {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })
    }

    async pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.2,
        });

         console.log(result);

        if (!result.cancelled) {
            this.state.image = result;
            this.props.onChange(result);
            this.forceUpdate();

        }
    };

    render() {
        return (

                <TouchableOpacity  style={styles.container} onPress={() => {this.pickImage()}}>
                    <Image source={this.state.image ? { uri: this.state.image.uri} : Avatar } style={{ width: windowWidth*0.15, height: windowWidth*0.15, borderRadius: 50 }} />
                </TouchableOpacity>





        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: windowWidth*0.15,
        width: windowWidth*0.15,
        backgroundColor: '#afafaf',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'

    },

});
