//actions that save that message to that state

import 'isomorphic-fetch'

export const GET_PANEL_SUCCESS = 'GET_PANEL_SUCCESS'
export const getPanelSuccess = panel => ({
	type: GET_PANEL_SUCCESS,
	panel
})

export const GET_PANEL_ERROR = 'GET_PANEL_ERROR'
export const getPanelError = error => ({
	type: GET_PANEL_ERROR, 
	error
})

export const getPanel = panel => {
	return dispatch => {
		const url = "http://localhost:8080/panel"
		return fetch(url)
		.then(response => {
			if (!response.ok) {
				const error = new Error(response.statusText)
				error.response = response
				throw error
			}
			return response
		})
		.then(response => response.json())
		.then(data => dispatch(getPanelSuccess(data)))
		.catch(error => dispatch(getPanelError(error)))
	}
}


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
		const url = "http://localhost:8080/panel"
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
		.then(data => dispatch(postPanelSuccess(data)))
		.catch(error => dispatch(postPanelError(error)))
	}
}


export const DELETE_PANEL_SUCCESS = 'DELETE_PANEL_SUCCESS';
export const deletePanelSuccess = id => ({
	type: DELETE_PANEL_SUCCESS, 
	id
})

export const DELETE_PANEL_ERROR = 'DELETE_PANEL_ERROR';
export const deletePanelError = error => ({
	type: DELETE_PANEL_ERROR, 
	error
})



export const deletePanel = id => {
	return dispatch => {
		const url = `http://localhost:8080/panel/${id}`
		return fetch(url, {
			method: 'delete'
		})
		.then(response =>  {
			if (!response.ok) {
				const error = new Error(response.statusText)
				error.response = response
				throw error
			}
			return response 
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => dispatch(postPanelError(error)))
	}
}
