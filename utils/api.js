import {AsyncStorage} from 'react-native'
import {Notifications, Permissions} from 'expo'

export const DECK_STORAGE_KEY = 'StudyDeck:native'

export function addData(decks){
	return AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify(decks))
}

export function getDecks(){
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
}
export function saveDeck(title,questions){
	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[title]:{
			title,
			questions
		}
	}))
}
export function deleteDeckAPI(title){
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((result) => {
			const data = JSON.parse(result)
			data[title] = undefined
			delete data[title]
			AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify(data))
		})
}


export function initialBuild(){
	return 	{
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
	  }
	}
}
