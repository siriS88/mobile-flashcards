import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { black, red } from "../utils/colors";

export class Question extends Component {
    render(){
        const {deckObj} = this.props;
        const questionObj = deckObj.questions[deckObj.quizIndex];
        return (
            <View style={styles.container}>
                <View style={styles.question}>
                    <Text style={styles.questionText}>{questionObj.question}</Text>
                    <TouchableOpacity style={styles.answerButton}
                        onPress={()=>this.props.navigation.navigate('Answer',
                            {deckObj: deckObj})}>
                        <Text style={styles.answerButtonText}>Go to answer</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    questionText: {
        color: black,
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    answerButton: {
        alignItems: 'center',
        margin: 20,
    },
    answerButtonText: {
        color: red,
        fontSize: 12,
    },
    question: {
        marginTop: 100,
        marginBottom:40,
        alignItems: 'center',
    },
});

export default connect(mapStateToProps)(Question);