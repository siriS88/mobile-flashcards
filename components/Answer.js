import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { green, red, white, black, purple, orange, gray } from "../utils/colors";
import { addQuizScore, addQuizIndex } from "../actions";
import { StackActions, NavigationActions } from 'react-navigation';
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

export class Answer extends Component {
    constructor(props){
        super(props);
        this.state={
            background: null,
        }

    }
    updateIndexDispatchAndNavigate = (dispatch, deckObj, newScore) => {
        if (deckObj.quizIndex < deckObj.questions.length-1) {
            dispatch(addQuizIndex(deckObj.title, deckObj.quizIndex+1));
            this.props.navigation.navigate('Question', {deckId: deckObj.title, answered: true});

            // //RESET STACK NAVIGATOR and add next Question screen onto stack
            // const resetAction = StackActions.reset({
            //     index: 0,
            //     actions: [NavigationActions.navigate({
            //         routeName: 'Question',
            //         params: {deckId: deckObj.title},
            //     })],
            //     key:this.props.navigation.dangerouslyGetParent().state.key
            // });
            // this.props.navigation.dispatch(resetAction);

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
        this.props.navigation.setParams({ answered: true });
        this.setState({background: green}, ()=>{
            setTimeout(()=>{
                dispatch(addQuizScore(deckObj.title, deckObj.quizScore+1));
                this.updateIndexDispatchAndNavigate(dispatch, deckObj, deckObj.quizScore+1);
            }, 100);
        });

    };

    markQuestionIncorrect = () => {
        const {deckObj} = this.props.navigation.state.params;
        const {dispatch} = this.props;
        this.props.navigation.setParams({ answered: true });
        this.setState({background: red}, ()=>{
            setTimeout(()=>{
                this.updateIndexDispatchAndNavigate(dispatch, deckObj, deckObj.quizScore);
            }, 100);
        });
    };

    render(){
        const {deckObj} = this.props.navigation.state.params;
        const questionObj = deckObj.questions[deckObj.quizIndex];

        const content = (
            <View>
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
                        <Text style={styles.correctButtonText}>
                            Correct
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.incorrectButton}
                                      onPress={this.markQuestionIncorrect}
                    >
                        <Text style={styles.incorrectButtonText}>
                            Incorrect
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

        return (
                !this.state.background ?
                <ImageBackground source={require("../assets/studyPattern.jpg")}
                                 style={[styles.container]}>
                    {content}
                </ImageBackground> :
                <View style={[styles.container, {backgroundColor:this.state.background}]}>
                    {content}
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
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
        margin: 20,
    },
    answerText: {
        color: black,
        fontSize: 40,
        alignSelf: 'center',
        fontWeight: 'bold',
        backgroundColor: white,
        borderColor: gray,
        borderWidth: 1,
        padding: 20,
        borderRadius: 7,
    },
    questionButton:{
        alignItems: 'center',
        margin: 20,
    },
    questionButtonText:{
        color: purple,
        fontSize: 20,
    },
    buttons: {
        marginBottom:100,
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
    },
    correctButton: {
        padding: 10,
        backgroundColor: orange,
        borderRadius: 5,
        margin: 5,
        height: 50,
    },
    correctButtonText :{
        color: black,
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    incorrectButtonText :{
        color: orange,
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    incorrectButton: {
        padding: 10,
        backgroundColor: black,
        borderRadius: 5,
        margin: 5,
        height: 50,
    },
});

export default connect()(Answer);