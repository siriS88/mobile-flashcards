import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet,
    TextInput, Platform, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { gray, white, black, orange } from "../utils/colors";
import {editCardInDeck} from '../utils/api';
import {editCard} from '../actions';

export class EditCard extends Component {
    static navigationOptions = () => {
        return {
            title: 'Edit Card',
        }
    };

    constructor(props){
        super(props);
        this.state = {
            question: props.questionObj.question,
            answer: props.questionObj.answer,
        }
    }

    submit = () => {
        const {navigation, dispatch} = this.props;
        const {deckId, cardIndex} = navigation.state.params;

        const card = {
            question: this.state.question,
            answer: this.state.answer
        };
        // Update the question to asyncstorage
        // and dispatch redux action to update store
        editCardInDeck(deckId, cardIndex, card).then(()=>{
            dispatch(editCard(deckId, cardIndex, card));
            // go back to deck view screen
            navigation.goBack();
        })
    };

    render() {
        return(
            <ImageBackground source={require("../assets/studyPattern.jpg")}
                             style={styles.container}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <View style={styles.form}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({question: text})}
                            value={this.state.question}
                            keyboardType='default'
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({answer: text})}
                            value={this.state.answer}
                            keyboardType='default'
                        />
                        <TouchableOpacity
                            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                            onPress={this.submit}
                        >
                            <Text style={styles.submitBtnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}

function mapStateToProps(state, {navigation}) {
    const {deckId} = navigation.state.params;
    const {cardIndex} = navigation.state.params;

    return {
        questionObj: state ? state[deckId].questions[cardIndex] : null,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        width: '100%',
        height: '100%',
    },
    form:{
        marginTop: 100,
    },
    textInput: {
        backgroundColor: '#fff',
        borderColor: black,
        borderWidth: 1,
        borderRadius: 7,
        height: 50,
        margin: 20,
        fontSize: 20,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 10,
    },
    iosSubmitBtn: {
        backgroundColor: black,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 10,
    },
    AndroidSubmitBtn: {
        backgroundColor: black,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        marginRight: 10,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: orange,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});


export default connect(mapStateToProps)(EditCard);
