import React, {
    Component
} from 'react';
import {
    View
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class NavigationTopBar extends Component{
    render(){
        const {title,leftButton,rightButton} = this.props;
        return(
            <View style={{backgroundColor: '#fff'}}>
                <NavigationBar
                    title={title === undefined?null:title()}
                    leftButton={leftButton === undefined?null:leftButton()}
                    rightButton={rightButton === undefined?null:rightButton()}
                />
            </View>
        )
    }
}