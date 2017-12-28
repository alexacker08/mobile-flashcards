import {AsyncStorage} from 'react-native'

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
		'React':{
			title:'React',
			questions:[
				{
					question:'React is a JavaScript library',
					answer:'Correct'
				},
				{
					question:'JSX is used to write HTML in React',
					answer:'Correct'
				}
			]
		},
		'JavaScript':{
			title:'JavaScript',
			questions:[
				{
					question:'ES6 is currently not accepted by all browsers',
					answer:'Correct'
				},
				{
					question:'Java and JavaScript are same language',
					answer:'Incorrect'
				}
			]
		}
	}
}
