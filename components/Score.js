import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {black, gray, white} from "../utils/colors";
import {addQuizStatus, addQuizScore, addQuizIndex} from "../actions";
import { StackActions, NavigationActions } from 'react-navigation';

export class Score extends Component {

    retakeQuiz = () => {
        const { dispatch } = this.props;
        const { deckObj } = this.props.navigation.state.params;

        // set the quiz started field for this deck
        // dispatch(addQuizStatus(deckObj.title, 'Started'));
        // // reset quiz info
        // dispatch(addQuizScore(deckObj.title, 0));
        // dispatch(addQuizIndex(deckObj.title, 0));

        // navigate to CardNav
        this.props.navigation.navigate('CardNav', {deckId: deckObj.title},
            NavigationActions.navigate({ routeName: 'Question' }));

        // The above is same as this - this also works:
        // this.props.navigate does dispatch of this underneath
        // https://stackoverflow.com/questions/43869903/differences-between-this-props-navigation-dispatch-vs-this-props-navigation-navi

        // const navigateAction = NavigationActions.navigate({
        //     routeName: 'CardNav',
        //     params: {deckId: deckObj.title},
        //     action: NavigationActions.navigate({ routeName: 'Question' }),
        // });
        // this.props.navigation.dispatch(navigateAction);
    };

    render() {
        const { deckObj } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.scoreText}>
                        {`Your Quiz Score percentage: ${(deckObj.quizScore/deckObj.questions.length)*100}%`}
                    </Text>
                    <Text style={styles.subScoreText}>
                        {`Total Correct Answers: ${deckObj.quizScore}`}
                    </Text>
                    <Text style={styles.subScoreText}>
                        {`Total Incorrect Answers: ${deckObj.questions.length-deckObj.quizScore}`}
                    </Text>
                    <Text style={styles.subScoreText}>
                        {`Total Questions answered: ${deckObj.questions.length}`}
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.retakeButton}
                                      onPress={this.retakeQuiz}
                    >
                        <Text style={styles.retakeButtonText}>Retake Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backToDeckButton}
                                      onPress={()=>this.props.navigation.navigate('Deck', {deckId: deckObj.title})}
                    >
                        <Text style={styles.backToDeckButtonText}>Back To Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header:{
        marginTop: 200,
        marginBottom:40,
        alignItems: 'center',
    },
    scoreText:{
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    subScoreText:{
        fontSize: 20,
        color: gray,
        alignSelf: 'center',
    },
    buttons: {
        marginBottom:100,
        alignItems: 'stretch',
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

export default connect()(Score);