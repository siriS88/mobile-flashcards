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
import { white, black, orange, gray } from "./utils/colors";
import Answer from "./components/Answer";
import Question from "./components/Question";
import Score from "./components/Score";
import EditDeck from "./components/EditDeck";
import EditCard from "./components/EditCard";
import {setLocalNotification} from "./utils/helpers";
import { composeWithDevTools } from 'redux-devtools-extension';

const transitionConfig = () => {
    // this function is adapted from https://medium.com/async-la/custom-transitions-in-react-navigation-2f759408a053
    return {
        transitionSpec: {
            duration: 400,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { position, layout, scene, index, scenes } = sceneProps;
            console.log("currentScene", scene);
            console.log("toIndex", index);
            console.log("scenes", scenes);

            const toIndex = index;
            const thisSceneIndex = scene.index;
            const height = layout.initHeight;
            const width = layout.initWidth;

            const sceneParams = scene.route.params || {};
            console.log("params", sceneParams);


            const translateXLeft = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [-width, 0, 0]
            });

            const translateXRight = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [width, 0, 0]
            });

            const translateY = position.interpolate({
                inputRange: [0, thisSceneIndex],
                outputRange: [height, 0]
            });

            const slideFromRight = { transform: [{ translateX: translateXRight  }] };
            const slideFromLeft = { transform: [{ translateX: translateXLeft }] };

            const slideFromBottom = { transform: [{ translateY }] };

            // Slide from right if we are going to answer
            if (toIndex ===1) return slideFromRight;
            // Slide from bottom only if we finished answering a question
            if (toIndex === 0 && sceneParams.answered ) return slideFromBottom;

            return slideFromLeft
        },
    }
};

const Tabs = createBottomTabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'DeckList',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list-box' size={40} color={tintColor} />
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'NewDeck',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={40} color={tintColor} />
        },
    },

}, {
    tabBarOptions: {
        activeTintColor: black,
        style: {
            height: 70,
            backgroundColor: orange,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        },
        labelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
        },
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
            header: null,
        }
    },
    Deck: {
        screen: Deck,
    },
    EditDeck: {
        screen: EditDeck,
        navigationOptions: {
            title: 'Cards',
        }
    },
    NewCard: {
      screen: NewCard,
    },
    EditCard: {
        screen: EditCard,
    },
    CardNav: {
        screen: CardNav,
        navigationOptions: {
            title: 'Quiz',
        }
    }
}  ,{
    navigationOptions: {
        headerStyle: {
            backgroundColor: orange,
        },
        headerTintColor: black,
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
    initialRouteName: 'Home',
});

export default class App extends React.Component {
    // store = createStore(reducer, applyMiddleware(logger));
    store = createStore(reducer, /* preloadedState, */ composeWithDevTools(
        applyMiddleware(logger),
        // other store enhancers if any
    ));

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
