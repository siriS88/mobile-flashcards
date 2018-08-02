import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Platform, FlatList, ImageBackground } from 'react-native';
import { white, gray, black, orange } from '../utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { deleteCardFromDeck } from '../utils/api';
import { deleteCard } from '../actions';

export class EditDeck extends Component {
    delete = (index) => {
        const {dispatch} = this.props;
        const {deckId} = this.props.navigation.state.params;

        deleteCardFromDeck(deckId, index).then(()=>{
            dispatch(deleteCard(deckId,index));
        }).catch((err)=>console.warn(`Unable to delete card due to ${err}`));
    };

    edit = (index) => {
        const {deckId} = this.props.navigation.state.params;
        this.props.navigation.navigate("EditCard", {deckId: deckId, cardIndex:index});
    };

    renderItem = ({item, index})=>(
        <View style={styles.item}>
            <Text style={styles.titleText}>{item.question}</Text>
            <View style={styles.row}>
                <TouchableOpacity style={{margin:5}}
                                  onPress={()=>{this.edit(index)}}>
                    <FontAwesome name='edit' size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={{margin:5}}
                                  onPress={()=>{this.delete(index)}}>
                    <Ionicons name='md-trash' size={25} />
                </TouchableOpacity>
            </View>
        </View>
    );

    render() {
        const {questions} = this.props;
        return(
            <ImageBackground source={require("../assets/studyPattern.jpg")}
                             style={styles.container}>
                <FlatList
                    data={questions}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.question}
                />
            </ImageBackground>
        )
    }
}

function mapStateToProps(state, {navigation}) {
    const {deckId} = navigation.state.params;
    return {
        questions: state ? state[deckId].questions : null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        width: '100%',
        height: '100%',
    },
    item: {
        backgroundColor: gray,
        borderRadius: Platform.OS === 'ios' ? 16 : 10,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'20%',
    },
    titleText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: orange,
        width:'80%',
    },
});

export default connect(mapStateToProps)(EditDeck)