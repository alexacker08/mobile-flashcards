import {ADD_CARD,EDIT_CARD} from '../actions'

var initialCards = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'React is a library for managing user interfaces.',
        answer: 'Correct'
      },
      {
        question: 'You make Ajax requests in the shouldComponentUpdate event.',
        answer: 'Incorrect'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'A closure is the combination of a function and lexical environment what that function was declared.',
        answer: 'Correct'
      }
    ]
  }
}

function cards(state = initialCards, action){
	switch(action.type){
		case ADD_CARD:
			return {
				...state,
			}
		case EDIT_CARD:
			return {
				...state
			}
		default:
			return state
	}
}

export default cards