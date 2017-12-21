export const ADD_CARD = 'ADD_CARD'
export const EDIT_CARD = 'EDIT_CARD'
export const ADD_QUESTION = 'ADD_QUESTION'

export function addCard(card){
	return {
		type: ADD_CARD,
		card,
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