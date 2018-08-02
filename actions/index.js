export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const ADD_QUIZ_SCORE = 'ADD_QUIZ_SCORE';
export const ADD_QUIZ_INDEX = 'ADD_QUIZ_INDEX';
export const DELETE_DECK = 'DELETE_DECK';
export const DELETE_CARD = 'DELETE_CARD';
export const EDIT_CARD = 'EDIT_CARD';


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

export function deleteADeck(title) {
    return {
        type: DELETE_DECK,
        title,
    }
}

export function deleteCard(title, index) {
    return {
        type: DELETE_CARD,
        title,
        index,
    }
}

export function editCard(title, index, card) {
    return {
        type: EDIT_CARD,
        title,
        index,
        card
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