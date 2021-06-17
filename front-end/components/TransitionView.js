import React from "react";
import * as Animatable from 'react-native-animatable';

export default class TransitionView extends React.Component{
 constructor(props) {
     super(props);
 }
    handleViewRef = ref => this.view = ref;
 componentDidMount() {
    this.out(1000);
 }

    in = () => this.view.slideInUp(800);
    out = (speed) => this.view.slideOutDown(speed);

 render() {
     const {...rest} = this.props;
     return(
         <Animatable.View
             ref={this.handleViewRef}
            {...rest}
         />

     );
 }
}
