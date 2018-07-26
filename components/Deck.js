import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { gray, white, black, orange } from "../utils/colors";
import { addQuizScore, addQuizIndex } from "../actions";

export class Deck extends Component {
    static navigationOptions = ({navigation}) => {
        const {id} = navigation.state.params;
        return {
            title: id,
        }
    };

    startQuiz = () => {
        const { deckObj, dispatch } = this.props;
        if (deckObj.questions.length ===0) return;
        // reset any previously unfinished quiz info left behind
        dispatch(addQuizScore(deckObj.title, 0));
        dispatch(addQuizIndex(deckObj.title, 0));

        // navigate to CardNav
        this.props.navigation.navigate('CardNav', {deckId: deckObj.title})
    };

    render() {
        const {deckObj} = this.props;
        return(
            <ImageBackground source={require("../assets/studyPattern.jpg")}
                             style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>{deckObj.title}</Text>
                    <Text style={styles.subHeading}>{`${deckObj.questions?deckObj.questions.length:0} cards`}</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.addButton}
                                      onPress={()=>
                                          this.props.navigation.navigate('NewCard', {deckId: deckObj.title}
                                          )}
                    >
                        <Text style={styles.addButtonText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quizButton}
                                      onPress={this.startQuiz}
                    >
                        <Text style={styles.quizButtonText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

function mapStateToProps(state, {navigation}){
    const {id} = navigation.state.params;
    return {
        deckObj:state[id],
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
    },
    header:{
        marginTop: 40,
        marginBottom:40,
        alignItems: 'center',
    },
    heading:{
        fontSize: 50,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    subHeading:{
        fontSize: 40,
        color: gray,
        alignSelf: 'center',
    },
    buttons: {
        marginBottom:100,
        alignItems: 'stretch',
        marginLeft: 20,
        marginRight: 20,
    },
    quizButton: {
        padding: 10,
        backgroundColor: black,
        borderRadius: 5,
        margin: 5,
        height: 50,
    },
    quizButtonText :{
        color: orange,
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    addButton: {
        padding: 10,
        backgroundColor: orange,
        borderRadius: 5,
        margin: 5,
        height: 50,
    },
    addButtonText: {
        color: black,
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});


export default connect(mapStateToProps)(Deck);
