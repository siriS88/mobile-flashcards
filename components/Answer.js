import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { green, red, white, black } from "../utils/colors";
import {addQuizStatus, addQuizScore, addQuizIndex} from "../actions";


export class Answer extends Component {
    markQuestionCorrect = () => {
        const {deckObj, dispatch} = this.props;
        dispatch(addQuizScore(deckObj.title, deckObj.quizScore+1));
        dispatch(addQuizIndex(deckObj.title, deckObj.quizIndex+1));
        this.props.navigation.navigate('CardNav', {deckId: deckObj.title})
    };

    markQuestionIncorrect = () => {
        const {deckObj, dispatch} = this.props;
        dispatch(addQuizIndex(deckObj.title, deckObj.quizIndex+1));
        this.props.navigation.navigate('CardNav', {deckId: deckObj.title})
    };

    render(){
        const {deckObj} = this.props;
        const questionObj = deckObj.questions[deckObj.quizIndex];

        return (
            <View style={styles.container}>
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
                    >
                        <Text style={styles.buttonText}
                              onPress={this.markQuestionIncorrect}>
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
    answer:{
        marginTop: 100,
        marginBottom:40,
        alignItems: 'center',
    },
    buttons: {
        marginBottom:100,
        alignItems: 'stretch',
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

function mapStateToProps(state, {navigation}) {
    const {deckId} = navigation.state.params;
    const deck = state[deckId];
    return {
        deckObj: deck ? deck : null
    }
}


export default connect(mapStateToProps)(Answer);