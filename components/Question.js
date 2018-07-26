import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { black, purple, white, gray } from "../utils/colors";

export class Question extends Component {
    componentWillReceiveProps(props){
        if (props.navigation.getParam('answered')) {
            props.navigation.setParams({answered: false});
        }
    }

    render(){
        const {deckObj} = this.props;
        const questionObj = deckObj.questions[deckObj.quizIndex];
        return (
            <ImageBackground source={require("../assets/studyPattern.jpg")}
                             style={styles.container}>
                <View style={styles.progress}>
                    <Text style={styles.progressText}>{`${deckObj.quizIndex+1}/${deckObj.questions.length}`}</Text>
                </View>
                <View style={styles.question}>
                    <Text style={styles.questionText}>{questionObj.question}</Text>
                    <TouchableOpacity style={styles.answerButton}
                        onPress={()=>this.props.navigation.navigate('Answer',
                            {deckObj: deckObj, answered:false})}>
                        <Text style={styles.answerButtonText}>Show answer</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

function mapStateToProps(state, {navigation}) {
    const {deckId} = navigation.state.params;
    const deck = state[deckId];
    return {
        deckObj: deck ? deck : null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
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
    question: {
        margin: 20,
        alignItems: 'center',
    },
    questionText: {
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
    answerButton: {
        alignItems: 'center',
        margin: 20,
    },
    answerButtonText: {
        color: purple,
        fontSize: 20,
        alignItems: 'center',
    },
});

export default connect(mapStateToProps)(Question);