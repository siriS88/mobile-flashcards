# App Overview
This app allows users to create decks of flashcards and quiz themselves on a deck. 
Once a quiz is taken, user is given  the score details. The app is built using 
react-native with Redux for state management. React native async storage is used to 
persist the decks information.

# Features Available
* View all flashcard decks
* Add a new deck
* View an individual deck
* Add a new flashcard to a deck
* Quiz on an individual deck
* View quiz scores and retake quiz

Notes:
 1) New decks and cards added will persist on refresh but quiz information does not
 2) Taking or re-taking a quiz always starts from question 1 and goes in sequence

# Run the App
To view the Would You Rather App:
* clone the `mobile-flashcards` repo
* cd to `mobile-flashcards`
* install all project dependencies with `yarn`
* start the development server with `yarn run start`

The page will be served on `localost:3000`

# Platforms Tested
Tested on android and ios emulators

