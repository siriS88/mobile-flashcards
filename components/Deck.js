import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {gray, white, black} from "../utils/colors";

export class Deck extends Component {
    static navigationOptions = ({navigation}) => {
        const {id} = navigation.state.params;
        return {
            title: id,
        }
    };
    render() {
        const {deckObj} = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>{deckObj.title}</Text>
                    <Text style={styles.subHeading}>{`${deckObj.questions.length} cards`}</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quizButton}>
                        <Text style={styles.quizButtonText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    header:{
        marginTop: 200,
        marginBottom:40,
        alignItems: 'center',
    },
    heading:{
        fontSize: 50,
        fontWeight: 'bold',
    },
    subHeading:{
        fontSize: 40,
        color: gray,
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
        color: white,
        fontSize: 20,
        alignSelf: 'center',
    },
    addButton: {
        padding: 10,
        backgroundColor: white,
        borderRadius: 5,
        margin: 5,
        borderColor: black,
        borderWidth: 1,
        height: 50,
    },
    addButtonText: {
        color: black,
        fontSize: 20,
        alignSelf: 'center',
    },
});


export default connect(mapStateToProps)(Deck);
