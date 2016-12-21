
//logic that saves the message to the state

import * as actions from '../actions/actions'
import update from 'immutability-helper';


const initialState = {
	strip: {
		editPanel: false,  // true: put request ... false: post request
		panels: [],
		newPanel: {
    		"filter": "",
    		"text": "Tell your story here...",
    		"imgUrl": "http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg",
    		"edits": false,
  		},
 		panelInProgress: {
 			"filter": "",
    		"text": "Tell your story here...",
    		"imgUrl": "http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg",
    		"edits": false,
 		}
	}
}
	// panels: [...state.strip.panels: action.panel]
export const mainReducer = (state=initialState, action) => {
	console.log(action, state)
	if (action.type === actions.GET_PANEL_SUCCESS) {
		return {
			...state,
			strip: {
				...state.strip,
				panels: action.panel
			}
		}
	}
	else if (action.type === actions.POST_PANEL_SUCCESS) {
		return {
			...state,
			strip: {
				...state.strip,
				panels: [...state.strip.panels, action.panel]
			}
		}
	}

	else if (action.type === actions.SAVE_IMAGE_URL) {
		return update(state, {strip: {panelInProgress: {imgUrl: {$set: action.url}}}})

	}

	return state
}
