import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Platform, FlatList } from 'react-native';
import {getDecks} from '../utils/api';
import {receiveDecks} from "../actions";
import { white, gray, black, orange } from '../utils/colors';


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

    renderItem = ({item})=>(
        <TouchableOpacity style={styles.item}
                          onPress={()=>this.props.navigation.navigate('Deck', {id: item.title})}
        >
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.subTitleText}>{`${item.questions?item.questions.length:0} cards`}</Text>
        </TouchableOpacity>
    );

    render() {
        const {decks} = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headingText}>Decks</Text>
                </View>
                <FlatList
                    data={decks}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.title}
                />
            </View>
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
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        borderBottomColor: orange,
        borderBottomWidth: 4,
        alignSelf: 'stretch',
    },
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 10,
        borderBottomColor: Platform.OS === 'ios' ? white : black,
        borderBottomWidth: 1,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    headingText:{
        fontSize: 25,
        fontWeight: 'bold',
        margin: 40,
        alignSelf: 'center',
        color: orange,
    },
    titleText:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    subTitleText:{
        fontSize: 15,
        color: gray,
    }
});

export default connect(mapStateToProps)(DeckList)