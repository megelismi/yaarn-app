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

export const getPanel = () => {
	return dispatch => {
		const url = "/panel"
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
		const url = "/panel"
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

export const postImage = panel => {
	return dispatch => {
		const url = "https://api.cloudinary.com/v1_1/megelismi/image/upload"
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

export const PUT_PANEL_SUCCESS = "PUT_PANEL_SUCCESS"
export const putPanelSuccess = panel => ({
	type: PUT_PANEL_SUCCESS,
	panel
})

export const PUT_PANEL_ERROR = "PUT_PANEL_ERROR"
export const putPanelError = panel => ({
	type: PUT_PANEL_ERROR,
	panel
})

export const putPanel = panel => dispatch => {
	console.log(panel)
	const url = `/panel/${panel._id}`
	return fetch(url, {
		method: 'put',
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
	.then(data => dispatch(getPanel()))
	.catch(error => dispatch(putPanelError(error)))

}


//delete panel success handled by getPanel()

export const DELETE_PANEL_ERROR = 'DELETE_PANEL_ERROR';
export const deletePanelError = error => ({
	type: DELETE_PANEL_ERROR,
	error
})



export const deletePanel = id => {
	return dispatch => {
		const url = `/panel/${id}`
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

export const EDIT_PANEL= 'EDIT_PANEL'
export const editPanel = (content) => ({
	type: EDIT_PANEL,
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

export const SAVE_TEXT_IN_PROGRESS = 'SAVE_TEXT_IN_PROGRESS'
export const saveTextInProgress = text => ({
	type: SAVE_TEXT_IN_PROGRESS,
	text
})

export const SAVE_FILTER_IN_PROGRESS = 'SAVE_FILTER_IN_PROGRESS'
export const saveFilterInProgress = filter => ({
	type: SAVE_FILTER_IN_PROGRESS, 
	filter
})

export const SAVE_IMAGE_URL = 'SAVE_IMAGE_URL'
export const saveImageUrl = url => ({
	type: SAVE_IMAGE_URL,
	url
})

export const APPLY_GRAYSCALE = 'APPLY_GRAYSCALE'
 export const applyGrayscale = () => ({
 type: APPLY_GRAYSCALE
 })

 export const APPLY_INVERT = 'APPLY_INVERT'
 export const applyInvert = () => ({
 	type: APPLY_INVERT
 })

export const APPLY_CONTRAST = 'APPLY_CONTRAST'
export const applyContrast = () => ({
 	type: APPLY_CONTRAST
 })

 export const APPLY_HUEROTATE = 'APPLY_HUEROTATE'
 export const applyHuerotate = () => ({
 	type: APPLY_HUEROTATE
 })

 export const APPLY_SEPIA = 'APPLY_SEPIA'
 export const applySepia = () => ({
 	type: APPLY_SEPIA
 })

 export const APPLY_SATURATE = 'APPLY_SATURATE'
 export const applySaturate = () => ({
	 type: APPLY_SATURATE
 })

 export const APPLY_GRAPEFRUIT = 'APPLY_GRAPEFRUIT'
 export const applyGrapefruit = () => ({
	 type: APPLY_GRAPEFRUIT
 })

 export const APPLY_HULK = 'APPLY_HULK'
 export const applyHulk = () => ({
	 type: APPLY_HULK
 })

 export const APPLY_PRINCE = 'APPLY_PRINCE'
 export const applyPrince = () => ({
	 type: APPLY_PRINCE
 })

 export const APPLY_NONE = 'APPLY_NONE'
 export const applyNone = () => ({
	 type: APPLY_NONE
 })
