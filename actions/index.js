export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const ADD_QUIZ_STATUS = 'ADD_QUIZ_STATUS';
export const ADD_QUIZ_SCORE = 'ADD_QUIZ_SCORE';
export const ADD_QUIZ_INDEX = 'ADD_QUIZ_INDEX';


export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeck(title) {
    return {
        type: ADD_DECK,
        title
    }
}

export function addCard(title, card) {
    return {
        type: ADD_CARD,
        title,
        card,
    }
}

export function addQuizStatus(title, status) {
    return {
        type: ADD_QUIZ_STATUS,
        title,
        status
    }
}

export function addQuizScore(title, score) {
    return {
        type: ADD_QUIZ_SCORE,
        title,
        score
    }
}

export function addQuizIndex(title, index) {
    return {
        type: ADD_QUIZ_INDEX,
        title,
        index
    }
}