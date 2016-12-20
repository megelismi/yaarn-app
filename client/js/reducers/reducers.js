
//logic that saves the message to the state

import * as actions from '../actions/actions'


const initialState = {
	strip: { 
		panels: [
		  {
		    "_id": "5859a70e39577c1bf95f9c45",
		    "filter": "grayscale",
		    "text": "Caption 4",
		    "imgUrl": "http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg",
		    "edits": false,
		    "__v": 0
		  },
		  {
		    "_id": "5859a9cd93ad291ca1f86041",
		    "filter": "grayscale",
		    "text": "Caption 2",
		    "imgUrl": "http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg",
		    "edits": false,
		    "__v": 0
		  },
		  {
		    "_id": "5859abff85f8b51d1b6e71fd",
		    "filter": "grayscale",
		    "text": "Caption 6",
		    "imgUrl": "http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg",
		    "edits": false,
		    "__v": 0
		  },
		  {
		    "_id": "5859ac42e0a2341d36c5c88c",
		    "filter": "grayscale",
		    "text": "Caption 7",
		    "imgUrl": "http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg",
		    "edits": false,
		    "__v": 0
		  },
		  {
		    "_id": "5859ac4be0a2341d36c5c88d",
		    "filter": "grayscale",
		    "text": "Caption 7",
		    "imgUrl": "http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg",
		    "edits": false,
		    "__v": 0
		  }
		]
	}
}

export const mainReducer = (state=initialState, action) => {
	if (action.type === actions.GET_MESSAGE) {
		return {
			...state, message: action.message
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

	return state
}

