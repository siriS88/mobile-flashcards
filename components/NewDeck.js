import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, TextInput,
    Platform, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { white, black, orange } from "../utils/colors";
import {saveDeckTitle} from '../utils/api';
import {addDeck} from '../actions';

export class NewDeck extends Component {

    constructor(props){
        super(props);
        this.state = {
            deckTitle: '',
        }
    }

    submit = () => {
        const {dispatch, navigation} = this.props;

        // Add new question to asyncstorage
        // and dispatch redux action to update store
        saveDeckTitle(this.state.deckTitle).then(()=>{
            const newDeckTitle = this.state.deckTitle;
            dispatch(addDeck(newDeckTitle));
            this.setState({deckTitle:''});
            // go back to deck view screen
            navigation.navigate('Deck', {id: newDeckTitle});
        })
    };

    render() {
        return(
            <ImageBackground source={require("../assets/studyPattern.jpg")}
                             style={styles.container}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.header}>
                        <Text style={styles.headingText}>Add Deck</Text>
                    </View>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Deck Title"
                            onChangeText={(text) => this.setState({deckTitle: text})}
                            value={this.state.deckTitle}
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
    header: {
        borderBottomColor: orange,
        borderBottomWidth: 4,
        backgroundColor: orange,
    },
    headingText:{
        fontSize: 40,
        fontWeight: 'bold',
        margin: 20,
        alignSelf: 'center',
        color: black,
        paddingTop: 10,
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


export default connect()(NewDeck);
