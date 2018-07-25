import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet,
    TextInput, Platform, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { gray, white, black, orange } from "../utils/colors";
import {addCardToDeck} from '../utils/api';
import {addCard} from '../actions';

export class NewCard extends Component {
    static navigationOptions = () => {
        return {
            title: 'Add Card',
        }
    };

    constructor(props){
      super(props);
      this.state = {
        question: '',
        answer: '',
      }
    }

    submit = () => {
      const {navigation, dispatch} = this.props;
      const {deckId} = navigation.state.params;

      const card = {
        question: this.state.question,
        answer: this.state.answer
      };
      // Add new question to asyncstorage
      // and dispatch redux action to update store
      addCardToDeck(deckId, card).then(()=>{
        dispatch(addCard(deckId, card));
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
                            placeholder="Type your question here"
                            onChangeText={(text) => this.setState({question: text})}
                            value={this.state.question}
                            keyboardType='default'
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Type your answer here"
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


export default connect()(NewCard);
