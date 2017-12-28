import {
	getDecks,
	getDeck,
	saveDeckTitle,
	addCard,
	initialBuild,
	addData,
	saveDeck,
	deleteDeckAPI
} from '../utils/helpers'


export const ADD_CARD = 'ADD_CARD'
export const EDIT_CARD = 'EDIT_CARD'
export const ADD_QUESTION = 'ADD_QUESTION'
export const DELETE_CARD = 'DELETE_CARD'
export const FETCHING = 'FETCHING'
export const FETCHING_COMP = 'FETCHING_COMP'

export function addCarding(card){
	return {
		type: ADD_CARD,
		card,
		fetch:false
	}
}

export function addQuestion(title,question){
	return {
		type: ADD_QUESTION,
		question,
		title
	}
}
export function editCard(card){
	return {
		type: EDIT_CARD,
		cardId
	}
}

export function deleteCard(title){
	return {
		type: DELETE_CARD,
		title
	}
}
export function fetching(){
	return {
		type: FETCHING,
		fetch: true
	}
}
export function fetchingComp(){
	return {
		type: FETCHING,
		fetch: false
	}
}
export function appPull(){
	return dispatch => {
		dispatch(fetching())
		getDecks().then((result) => {
			const decks = JSON.parse(result)
			if(result === null){
				let initialDeck = initialBuild()
				addData(initialDeck).then(() => {
					dispatch(addCarding(initialDeck))
					dispatch(fetchingComp())
				})
			} else {
				dispatch(addCarding(decks))
				dispatch(fetchingComp())
			}
		})
	}
}

export function deletingCard(title){
	return dispatch => {
		deleteDeckAPI(title).then(() => {
			dispatch(deleteCard(title))
		})
	}
}

export function addDeck(title,questions){
	return dispatch => {
		dispatch(fetching())
		dispatch(addQuestion(title,questions))
		dispatch(fetchingComp())
	}
}
