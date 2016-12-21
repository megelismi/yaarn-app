
//logic that saves the message to the state

import * as actions from '../actions/actions'


const initialState = {
	strip: {
		editPanel: false,  // true: put request ... false: post request
		panels: []
	}
}
	// panels: [...state.strip.panels: action.panel]
export const mainReducer = (state=initialState, action) => {
	if (action.type === actions.GET_PANEL_SUCCESS) {
		console.log('action panel', action.panel)
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
	// else if (action.type === actions.DELETE_PANEL_SUCCESS) {
		
	// }

	return state
}
