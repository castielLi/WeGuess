/**
 * Created by apple on 2017/6/6.
 */

import React, { Component } from 'react';
import { Text , View , Button} from 'react-native'
import { TabNavigator,StackNavigator } from "react-navigation";

// class RecentChatsScreen extends React.Component {
//     render() {
//         return <Text>List of recent chats</Text>
//     }
// }
//
class AllContactsScreen extends React.Component {
    render() {
        return <Text>List of all contacts</Text>
    }
}
//
// const MainTabbar = TabNavigator({
//     Recent: { screen: RecentChatsScreen },
//     All: { screen: AllContactsScreen },
// });
// export default MainTabbar;

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                    onPress={() => navigate('Chat')}
                    title="Chat with Lucy"
                />
            </View>
        );
    }
}


const MainTabbar = StackNavigator({
    Home: { screen: HomeScreen },
    Chat: { screen: AllContactsScreen }
});
export default MainTabbar;