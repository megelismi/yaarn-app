//actions that save that message to that state

import 'isomorphic-fetch'


export const SAVE_IMAGE_URL = 'SAVE_IMAGE_URL'
export const saveImageUrl = url => ({
	type: SAVE_IMAGE_URL,
	url
})

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

export const getPanel = () => {
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

//delete panel success handled by getPanel()

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
	.then(data => dispatch(getPanel()))
	.catch(error => dispatch(deletePanelError(error)))
	}
}

export const SAVE_PANEL_IN_PROGRESS = 'SAVE_PANEL_IN_PROGRESS'
export const savePanelInProgress = (content) => ({
	type: SAVE_PANEL_IN_PROGRESS,
	content
})

export const CLOSE_PANEL = 'CLOSE_PANEL'
export const closePanel = () => ({
	type: CLOSE_PANEL
})

export const CREATE_NEW_PANEL = 'CREATE_NEW_PANEL'
export const createNewPanel = () => ({
	type: CREATE_NEW_PANEL
})
