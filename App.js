import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import reducer from './reducers';
import logger from './middleware';
import { View, Platform } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import NewCard from './components/NewCard';
import NewDeck from './components/NewDeck';
import { white, black } from "./utils/colors";
import Answer from "./components/Answer";
import Question from "./components/Question";
import Score from "./components/Score";


const Tabs = createBottomTabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'DeckList',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        },
    },

    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'NewDeck',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />        },
    },

}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: black,
        style: {
            height: 56,
            backgroundColor: white,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
});

const CardNav = createStackNavigator({
        Question: {
            screen: Question,
        },
        Answer: {
            screen: Answer,
        },
        Score: {
            screen: Score,

        }
    }, {
        navigationOptions: {
            header: null
        },
        initialRouteName: 'Question',
    });

const Stack = createStackNavigator({
    Home: {
        screen: Tabs,
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
    NewCard: {
      screen: NewCard,
      navigationOptions: {
          headerTintColor: white,
          headerStyle: {
              backgroundColor: black,
          }
      }
    },
    CardNav: {
        screen: CardNav,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black,
            }
        }
    }
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
