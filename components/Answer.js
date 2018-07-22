import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { green, red, white, black } from "../utils/colors";
import { addQuizScore, addQuizIndex } from "../actions";
import { StackActions, NavigationActions } from 'react-navigation';
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

export class Answer extends Component {
    updateIndexDispatchAndNavigate = (dispatch, deckObj, newScore) => {
        if (deckObj.quizIndex < deckObj.questions.length-1) {
            dispatch(addQuizIndex(deckObj.title, deckObj.quizIndex+1));

            //RESET STACK NAVIGATOR and add next Question screen onto stack
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({
                    routeName: 'Question',
                    params: {deckId: deckObj.title},
                })],
                key:this.props.navigation.dangerouslyGetParent().state.key
            });
            this.props.navigation.dispatch(resetAction);

        } else if (deckObj.quizIndex === deckObj.questions.length-1) {
            // reset quiz info
            dispatch(addQuizScore(deckObj.title, 0));
            dispatch(addQuizIndex(deckObj.title, 0));

            // clear local notification for today and set a new one for tomorrow
            clearLocalNotification()
                .then(setLocalNotification)
                .catch((err)=>console.log(err));

            this.props.navigation.navigate('Score', {
                scoreObj: {
                    correct: newScore,
                    total: deckObj.questions.length
                },
                deckId: deckObj.title,
            });
        }

    };

    markQuestionCorrect = () => {
        const {deckObj} = this.props.navigation.state.params;
        const {dispatch} = this.props;
        dispatch(addQuizScore(deckObj.title, deckObj.quizScore+1));
        this.updateIndexDispatchAndNavigate(dispatch, deckObj, deckObj.quizScore+1);
    };

    markQuestionIncorrect = () => {
        const {deckObj} = this.props.navigation.state.params;
        const {dispatch} = this.props;
        this.updateIndexDispatchAndNavigate(dispatch, deckObj, deckObj.quizScore);
    };

    render(){
        const {deckObj} = this.props.navigation.state.params;
        const questionObj = deckObj.questions[deckObj.quizIndex];

        return (
            <View style={styles.container}>
                <View style={styles.progress}>
                    <Text style={styles.progressText}>{`${deckObj.quizIndex+1}/${deckObj.questions.length}`}</Text>
                </View>
                <View style={styles.answer}>
                    <Text style={styles.answerText}>{questionObj.answer}</Text>
                    <TouchableOpacity style={styles.questionButton}
                                      onPress={()=>this.props.navigation.goBack()}>
                        <Text style={styles.questionButtonText}>Go Back to question</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.correctButton}
                                      onPress={this.markQuestionCorrect}
                    >
                        <Text style={styles.buttonText}>
                            Correct
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.incorrectButton}
                                      onPress={this.markQuestionIncorrect}
                    >
                        <Text style={styles.buttonText}>
                            Incorrect
                        </Text>
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
        alignItems: 'center',
    },
    progress: {
        margin: 20,
        alignSelf: 'flex-start',
    },
    progressText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    answer:{
        margin: 40,
    },
    answerText: {
        color: black,
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    questionButton:{
        alignItems: 'center',
        margin: 20,
    },
    questionButtonText:{
        color: red,
        fontSize: 12,
    },
    buttons: {
        marginBottom:100,
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
    },
    correctButton: {
        padding: 10,
        backgroundColor: green,
        borderRadius: 5,
        margin: 5,
        height: 50,
    },
    buttonText :{
        color: white,
        fontSize: 20,
        alignSelf: 'center',
    },
    incorrectButton: {
        padding: 10,
        backgroundColor: red,
        borderRadius: 5,
        margin: 5,
        height: 50,
    },
});

export default connect()(Answer);