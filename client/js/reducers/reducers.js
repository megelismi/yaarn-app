
//logic that saves the message to the state

import * as actions from '../actions/actions'


const initialState = {
	strip: {
		name: "", 
		panels: [
			{
				filter: '', 
				text: 'hi', 
				imgUrl: '', 
				edits: ''
			}, 
			{
				filter: '', 
				text: '', 
				imgUrl: '', 
				edits: ''
			}, 
		]
	}
}

export const mainReducer = (state=initialState, action) => {
	if (action.type === actions.GET_MESSAGE) {
		return {
			...state, message: action.message
		}
	}

	return state
}

/*
{
	board: {
		name: '',
		panels: [{},{},{}]
	}
}
/*