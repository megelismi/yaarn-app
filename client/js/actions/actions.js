//actions that save that message to that state

import 'isomorphic-fetch'

export const GET_MESSAGE = 'GET_MESSAGE'
export const getMessage = message => ({
	type: GET_MESSAGE, 
	message
})


export const GET_PANEL_DATA = 'GET_PANEL_DATA'
export const getImageUrl = panel => ({
	type: GET_PANEL_DATA, 
	panel
})

export const fetchMessage = () => {
	return dispatch => {
		const url = "http://localhost:8080/photos" 
		return fetch(url)
			.then(response => {
				if(!response.ok) {
					const error = new Error(response.statusText)
					error.response = response
					throw error
				}
				return response
			})
				.then(response => response.json())
				.then(data => dispatch(getMessage(data)))
				.catch(error => console.log(error))
	}
}
