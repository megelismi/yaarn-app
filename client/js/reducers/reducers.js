
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
    		"text": "Add your next masterpiece.",
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

	else if (action.type === actions.PUT_PANEL_SUCCESS) {
		console.log(action.panel)
	  return state
	}

	else if (action.type === actions.PUT_PANEL_ERROR) {
		console.log(action.error)
		return state
	}

	else if (action.type === actions.SAVE_IMAGE_URL) {
		return update(state, {strip: {panelInProgress: {imgUrl: {$set: action.url}}}})

	}
	else if (action.type === actions.EDIT_PANEL) { // rename to begin edit/new
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

	else if (action.type === actions.APPLY_GRAYSCALE) {
 		return update(state, {strip: {panelInProgress: {filter: {$set: "Grayscale"}}}})
 	}

 	else if (action.type === actions.APPLY_INVERT) {
 		return update(state, {strip: {panelInProgress: {filter: {$set: "Invert"}}}})
 	}

 	else if (action.type === actions.APPLY_CONTRAST) {
 		return update(state, {strip: {panelInProgress: {filter: {$set: "Contrast"}}}})
 	}

 	else if (action.type === actions.APPLY_HUEROTATE) {
 		return update(state, {strip: {panelInProgress: {filter: {$set: "Huerotate"}}}})
 	}

 	else if (action.type === actions.APPLY_SEPIA) {
		return update(state, {strip: {panelInProgress: {filter: {$set: "Sepia"}}}})
 	}

 	else if (action.type === actions.SAVE_TEXT_IN_PROGRESS) {
 		return update(state, {strip: {panelInProgress: {text: {$set: action.text}}}})
 	}

	return state
}
