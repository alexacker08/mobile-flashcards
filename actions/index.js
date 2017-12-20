export const ADD_CARD = 'ADD_CARD'
export const EDIT_CARD = 'EDIT_CARD'

export function addCard(card){
	return {
		type: ADD_CARD,
		card,
	}
}
export function editCard(card){
	return {
		type: EDIT_CARD,
		cardId
	}
}