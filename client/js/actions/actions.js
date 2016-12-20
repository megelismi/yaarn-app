//actions that save that message to that state

import 'isomorphic-fetch'

export const POST_PANEL_SUCCESS = 'POST_PANEL_SUCCESS'
export const postPanelSuccess = panel => ({
	type: POST_PANEL_SUCCESS,
	panel
})

export const POST_PANEL_ERROR = 'POST_PANEL_ERROR'
export const postPanelError = error => ({
	type: POST_PANEL_ERROR, 
	error
})


export const postPanel = panel => {
	return dispatch => {
		const url = "http://localhost:8080/panels"
		return fetch(url, {
			method: 'post', 
			headers: {
				'Content-type': "application/json; charset=utf-8"
			}, 
			body: JSON.stringify(panel)
		})
		.then(response => {
			if (!response.ok) {
				const error = new Error(response.statusText)
				error.response = response
				throw error
			}
			return response
		})
		.then(response => response.json())
		.then(console.log(data))
		.catch(error => dispatch(postPanelError(error)))
	}
}
