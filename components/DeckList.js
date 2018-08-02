import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Platform, FlatList, ImageBackground } from 'react-native';
import {getDecks, deleteDeck} from '../utils/api';
import {receiveDecks, deleteADeck} from "../actions";
import { white, gray, black, orange } from '../utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export class DeckList extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        // get all the decks from the persistent async storage
        // and initialize redux store with these decks
        getDecks().then((decks)=>{
            let decksAugmented = Object.keys(decks).map((key)=>{
                return {
                    [key]: {
                        ...decks[key],
                        quizStatus: 'Not Started',
                        quizScore: 0,
                        quizIndex: 0,
                    }
                }
            });
            decksAugmented = Object.assign({},...decksAugmented);
            dispatch(receiveDecks(decksAugmented));
        });
    }

    delete = (title) => {
        const {dispatch} = this.props;
        deleteDeck(title).then(()=>{
            dispatch(deleteADeck(title));
        }).catch((err)=>console.warn(`Unable to delete deck ${title} due to ${err}`))
    };

    edit = (title) => {
        this.props.navigation.navigate('EditDeck', {deckId:title});
    };

    renderItem = ({item})=>(
        <TouchableOpacity style={styles.item}
                          onPress={()=>this.props.navigation.navigate('Deck', {id: item.title})}
        >
            <View style={styles.row}>
                <Text style={styles.titleText}>{item.title}</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={{margin:5}}
                                      onPress={()=>
                                          this.props.navigation.navigate('NewCard', {deckId: item.title}
                                          )}
                    >
                        <Ionicons name='md-add' size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin:5}}
                                      onPress={()=>{this.edit(item.title)}}>
                        <FontAwesome name='edit' size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin:5}}
                                      onPress={()=>{this.delete(item.title)}}>
                        <Ionicons name='md-trash' size={25} />
                    </TouchableOpacity>
                    </View>
            </View>
            <Text style={styles.subTitleText}>{`${item.questions?item.questions.length:0} cards`}</Text>
        </TouchableOpacity>
    );

    render() {
        const {decks} = this.props;
        return(
            <ImageBackground source={require("../assets/studyPattern.jpg")}
                             style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headingText}>Decks</Text>
                </View>
                <FlatList
                    data={decks}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.title}
                />
            </ImageBackground>
        )
    }
}

function mapStateToProps(entries) {
    return {
        decks: entries ? Object.values(entries) : null
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
    header: {
        borderBottomColor: orange,
        borderBottomWidth: 4,
        backgroundColor: orange,
    },
    item: {
        backgroundColor: gray,
        borderRadius: Platform.OS === 'ios' ? 16 : 10,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        justifyContent: 'center',
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
        justifyContent: 'space-between'
    },
    headingText:{
        fontSize: 40,
        fontWeight: 'bold',
        margin: 20,
        alignSelf: 'center',
        color: black,
        paddingTop: 10,
    },
    titleText:{
        fontSize: 30,
        fontWeight: 'bold',
        color: orange,
    },
    subTitleText:{
        fontSize: 20,
        color: black,
    }
});

export default connect(mapStateToProps)(DeckList)