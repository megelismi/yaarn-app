
//logic that saves the message to the state

import * as actions from '../actions/actions'


const initialState = {
	message: ''
}

export const mainReducer = (state=initialState, action) => {
	if (action.type === actions.GET_MESSAGE) {
		console.log('get message reached', state)
		return {
			...state, message: action.message
		}
	}

	return state
}