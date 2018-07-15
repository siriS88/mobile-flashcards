import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Platform, FlatList } from 'react-native';
import {getDecks} from '../utils/api';
import {receiveDecks} from "../actions";
import Deck from './Deck';
import { white, gray } from '../utils/colors';


export class DeckList extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        // get all the decks from the persistent async storage
        // and initialize redux store with these decks
        getDecks().then((decks)=>{
            dispatch(receiveDecks(decks));
        });
    }

    renderItem = ({item})=>(
            <TouchableOpacity style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subTitle}>{`${item.questions.length} cards`}</Text>
            </TouchableOpacity>
    );

    render() {
        const {decks} = this.props;
        console.log("decks to render", decks);
        return(
            <View style={styles.container}>
                <Text style={styles.heading}>Decks</Text>
                <View style={styles.list}>
                    <FlatList
                        data={decks}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.title}
                    />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state ? Object.values(state) : null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        margin: 20,
    },
    list: {
        justifyContent:'flex-start',
        flex: 1,
        marginTop: 40,
    },
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 10,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
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
    heading:{
        fontSize: 25,
        fontWeight: 'bold',
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    subTitle:{
        fontSize: 15,
        color: gray,
    }
});

export default connect(mapStateToProps)(DeckList)