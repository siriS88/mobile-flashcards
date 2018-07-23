import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import reducer from './reducers';
import logger from './middleware';
import { View, Easing, Animated } from 'react-native';
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
import {setLocalNotification} from "./utils/helpers";

const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 750,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { position, layout, scene, index, scenes } = sceneProps;
            console.log("currenScene", scene);
            console.log("toIndex", index);
            console.log("scenes", scenes);

            const thisSceneIndex = scene.index;
            const height = layout.initHeight;
            const width = layout.initWidth;

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [width, 0, 0]
            });

            const translateY = position.interpolate({
                inputRange: [0, thisSceneIndex],
                outputRange: [height, 0]
            });

            const slideFromRight = { transform: [{ translateX }] };
            const slideFromBottom = { transform: [{ translateY }] };

            // Do not transform the screen being navigated to
            if (index < scene.index && index ===0) return slideFromBottom;

            return slideFromRight
        },
    }
};

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
        transitionConfig,
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

    componentDidMount(){
        setLocalNotification();
    }

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
