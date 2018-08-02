import {RECEIVE_DECKS, ADD_DECK, ADD_CARD, ADD_QUIZ_SCORE, ADD_QUIZ_INDEX, DELETE_DECK, DELETE_CARD, EDIT_CARD } from '../actions';

export default function(state={}, action) {
    switch (action.type){
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            };
        case ADD_DECK:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: [],
                    quizStatus: 'Not Started',
                    quizScore: 0,
                    quizIndex: 0,
                }
            };
        case ADD_CARD:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: state[action.title].questions.concat([action.card])
                }
            };
        case ADD_QUIZ_SCORE:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    quizScore: action.score
                }
            };
        case ADD_QUIZ_INDEX:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    quizIndex: action.index
                }
            };
        case DELETE_DECK:
            const decks = Object.assign({}, state);
            delete decks[action.title];
            return {
                ...decks
            };

        case DELETE_CARD:
            const allDecks = Object.assign({}, state);
            const deck = allDecks[action.title];
            deck.questions.splice(action.index, 1);
            return {
                ...allDecks
            };
        case EDIT_CARD:
            const modQues = state[action.title].questions;
            modQues[action.index] = action.card;
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: modQues,
                }
            };
        default:
            return state

    }

}