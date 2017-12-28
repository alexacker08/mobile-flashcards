import {ADD_CARD,EDIT_CARD,ADD_QUESTION,FETCHING,FETCHING_COMP,DELETE_CARD} from '../actions'
import {combineReducers} from 'redux';


const fetch = {
  fetch: false
}

//Not used now but can be used with any Async integrations to display loading functionality
function fetching(state = fetch, action){
  switch(action.type){
    case FETCHING:
      return {
        ...state,
        fetch:action.fetch
      }
    default:
      return state
  }
}

//Reducer that helps to keep most of the App up to date through the users activity
function cards(state = {}, action){
	switch(action.type){
		case ADD_CARD:
			return {
				...state,
        ...action.card
			}
		case EDIT_CARD:
			return {
				...state,
			}
		case ADD_QUESTION:
			return {
				...state,
				[action.title]:{
					...state[action.title],
					questions: action.question
				}
			}
    case DELETE_CARD:
      return {
        ...state,
        [action.title]:{
          ...state[action.title],
          deleted:true
        }
      }
		default:
			return state
	}
}

export default combineReducers({fetching,cards})