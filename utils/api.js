import { AsyncStorage } from 'react-native'

/**
getDecks: return all of the decks along with their titles, questions, and answers.
    getDeck: take in a single id argument and return the deck associated with that id.
    saveDeckTitle: take in a single title argument and add it to the decks.
    addCardToDeck: take in two arguments, title and card, and will add the card to the list of
questions for the deck with the associated title
 */

const DECKS_STORAGE_KEY = 'Decks@FlashCards';
const DECKS_QUIZ_DATES = 'Decks@QuizDates';


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
            title: 'JavaScriptjhgcghcghkcghcghcghkghghgkkg',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
        JavaScript2: {
            title: 'JavaScriptjhgcghcghkcghcghcghkghghgkkg2',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
        JavaScript3: {
            title: 'JavaScriptjhgcghcghkcghcghcghkghghgkkg3',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
        JavaScript4: {
            title: 'JavaScriptjhgcghcghkcghcghcghkghghgkkg4',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
        JavaScript5: {
            title: 'JavaScriptjhgcghcghkcghcghcghkghghgkkg5',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
        JavaScript6: {
            title: 'JavaScriptjhgcghcghkcghcghcghkghghgkkg6',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
        JavaScript7: {
            title: 'JavaScriptjhgcghcghkcghcghcghkghghgkkg7',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
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

// export function addQuizInfoToDate(date, quizInfo) {
//     return AsyncStorage.mergeItem(DECKS_QUIZ_DATES, JSON.stringify({
//         date: quizInfo
//     }))
// }
//
// export function getQuizDateInfo() {
//     return AsyncStorage.getItem(DECKS_QUIZ_DATES)
//         .then((info)=>JSON.parse(info)).catch((err)=>{
//         console.error('Unable to add card to deck due to:', err)
//     })
// }