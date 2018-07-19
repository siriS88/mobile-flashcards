import {RECEIVE_DECKS, ADD_DECK, ADD_CARD, ADD_QUIZ_STATUS, ADD_QUIZ_SCORE, ADD_QUIZ_INDEX } from '../actions';

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
        case ADD_QUIZ_STATUS:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    quizStatus: action.status
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
        default:
            return state

    }

}