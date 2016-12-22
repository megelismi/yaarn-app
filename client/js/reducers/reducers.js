
//logic that saves the message to the state

import * as actions from '../actions/actions'
import update from 'immutability-helper';


const initialState = {
	strip: {
		editPanel: false,  // true: put request ... false: post request
		panels: [],
		newPanel: {
				"id": "newStrip",
    		"filter": "",
    		"text": "Stories of Cats dying",
    		"imgUrl": "http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg",
    		"edits": false
  		},
  		modalUp: false,
 		panelInProgress: {
 			"filter": "",
    		"text": "",
    		"imgUrl": "",
    		"edits": false
 		}
	}
}
	// panels: [...state.strip.panels: action.panel]
export const mainReducer = (state=initialState, action) => {
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
	else if (action.type === actions.SAVE_PANEL_IN_PROGRESS) { // rename to begin edit/new
		console.log('action SAVE_PANEL_IN_PROGRESS: ', action.content)
		return update(state, {strip: {modalUp: {$set: true }, panelInProgress: {$set: action.content }}})
	}
	else if (action.type === actions.CLOSE_PANEL) {
		// console.log('close panel action called in reducer')
		return update(state, {strip: {modalUp: {$set: false}}})
	}
	else if (action.type === actions.CREATE_NEW_PANEL) {
		// console.log('new panel action called')
		const newContent = state.strip.newPanel
		return update(state, {strip: {modalUp: {$set: true }, panelInProgress: {$set: newContent }}})
	}

	return state
}
