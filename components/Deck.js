import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

export class Deck extends Component {
    render() {
        const {deckObj} = this.props;
        return(
            <View>
                <View>
                    <Text>{deckObj.title}</Text>
                    <Text>{`${deckObj.questions.length} cards`}</Text>
                </View>
                <View>
                    <TouchableOpacity >
                        <Text>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state, props){
    const {deckObj} = props;
    return {
        decks: state,
        deckObj,
    }
}

export default connect(mapStateToProps)(Deck);
