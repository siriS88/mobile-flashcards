import { AsyncStorage } from 'react-native'

/**
getDecks: return all of the decks along with their titles, questions, and answers.
    getDeck: take in a single id argument and return the deck associated with that id.
    saveDeckTitle: take in a single title argument and add it to the decks.
    addCardToDeck: take in two arguments, title and card, and will add the card to the list of
questions for the deck with the associated title
 */

const DECKS_STORAGE_KEY = 'Decks@FlashCards';

function getDummyData() {
    return {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
    };
}

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks)=>{
        // if there is no data initially, add some dummy data to start off
        if (decks === null) {
            const dummyData = getDummyData();
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData));
            return dummyData;
        }
        return JSON.parse(decks);
    }).catch((err)=>{
        console.error('Unable to retrieve stored decks from AsyncStorage due to: ',err)
    })
}

export function getDeck(id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((decks)=>JSON.parse(decks))
        .then((decks)=>decks[id])
        .catch((err)=>{
            console.error(`Unable to retrieve deck with id: ${id} from AsyncStorage due to: ${err}`)
        })
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }))
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            let data = JSON.parse(results);
            // add the card to the questions array of the deck with the given title
            data = {
                ...data,
                [title]: {
                    ...data[title],
                    questions : data[title].questions.concat([card])
                }
            };
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
        .catch((err)=>{
            console.error('Unable to add card to deck due to:', err)
        })
}

export function deleteDeck(title) {
    return getDecks().then((decks)=>{
        let data = decks;
        delete data[title];
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    })
}

export function deleteCardFromDeck(title, cardIdx) {
    return getDecks().then((decks)=>{
        let data = decks;
        data[title].questions.splice(cardIdx, 1);
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    })
}

export function editCardInDeck(title, cardIdx, card) {
    return getDecks().then((decks)=>{
        let data = decks;
        data[title].questions[cardIdx] = card;
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    })
}