import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import {black, gray, white, green, red} from "../utils/colors";
import { StackActions, NavigationActions } from 'react-navigation';

export class Score extends Component {

    retakeQuiz = () => {
        const { deckId } = this.props.navigation.state.params;

        // // navigate to CardNav
        // this.props.navigation.navigate('CardNav', {deckId: deckId},
        //     NavigationActions.navigate({ routeName: 'Question' }));

        // The above is same as this - this also works:
        // this.props.navigate does dispatch of this underneath
        // https://stackoverflow.com/questions/43869903/differences-between-this-props-navigation-dispatch-vs-this-props-navigation-navi

        // const navigateAction = NavigationActions.navigate({
        //     routeName: 'CardNav',
        //     params: {deckId: deckObj.title},
        //     action: NavigationActions.navigate({ routeName: 'Question' }),
        // });
        // this.props.navigation.dispatch(navigateAction);

        //RESET STACK NAVIGATOR and add next Question screen onto stack
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'Question',
                params: {deckId: deckId},
            })],
            key:this.props.navigation.dangerouslyGetParent().state.key
        });
        this.props.navigation.dispatch(resetAction);
    };

    render() {
        const { scoreObj, deckId } = this.props.navigation.state.params;
        return (
            <ImageBackground source={require("../assets/studyPattern.jpg")}
                             style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.deckTitleText}>
                        {`Deck: ${deckId}`}
                    </Text>
                    <Text style={styles.scoreText}>
                        {`Your Quiz Score: ${Math.round((scoreObj.correct/scoreObj.total)*100)}%`}
                    </Text>
                    <Text style={[styles.subScoreText, {color:green}]}>
                        {`Total Correct Answers: ${scoreObj.correct}`}
                    </Text>
                    <Text style={[styles.subScoreText, {color:red}]}>
                        {`Total Incorrect Answers: ${scoreObj.total - scoreObj.correct}`}
                    </Text>
                    <Text style={styles.subScoreText}>
                        {`Total Questions Answered: ${scoreObj.total}`}
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.retakeButton}
                                      onPress={this.retakeQuiz}
                    >
                        <Text style={styles.retakeButtonText}>Retake Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backToDeckButton}
                                      onPress={()=>this.props.navigation.navigate('Deck', {deckId: deckId})}
                    >
                        <Text style={styles.backToDeckButtonText}>Back To Deck</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    header:{
        marginTop: 100,
        marginBottom:40,
        alignItems: 'center',
    },
    deckTitleText:{
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20
    },
    scoreText:{
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20
    },
    subScoreText:{
        fontSize: 20,
        color: gray,
        alignSelf: 'center',
        marginBottom: 20,
    },
    buttons: {
        marginBottom:100,
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
    },
    backToDeckButton: {
        padding: 10,
        backgroundColor: black,
        borderRadius: 5,
        margin: 5,
        height: 50,
    },
    backToDeckButtonText :{
        color: white,
        fontSize: 20,
        alignSelf: 'center',
    },
    retakeButton: {
        padding: 10,
        backgroundColor: white,
        borderRadius: 5,
        margin: 5,
        borderColor: black,
        borderWidth: 1,
        height: 50,
    },
    retakeButtonText: {
        color: black,
        fontSize: 20,
        alignSelf: 'center',
    },
});

export default Score;