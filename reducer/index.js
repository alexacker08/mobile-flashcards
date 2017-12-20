import {ADD_CARD,EDIT_CARD} from '../actions'

var initialCards = {
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