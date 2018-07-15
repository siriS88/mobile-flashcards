import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import reducer from './reducers';
import logger from './middleware';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import { white, black } from './utils/colors';


const Stack = createStackNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            header: null
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black,
            }
        }
    },
});

export default class App extends React.Component {
    store = createStore(reducer, applyMiddleware(logger));

    render() {
    return (
        <Provider store={this.store}>
            <View style={{flex:1}}>
                <Stack/>
            </View>
        </Provider>
    );
  }
}
