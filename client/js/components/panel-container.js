
import React from 'react'
import ImageUpload from './image-upload'
import {connect} from 'react-redux'
import * as actions from '../actions/actions'
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'e7zwclsa';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/megelismi/upload';


let value = ""
let text = ""

class PanelContainer extends React.Component {
	constructor(props) {
		super(props)
		this.closePanel = this.closePanel.bind(this)
		this.savePanel =	this.savePanel.bind(this)

		this.filters = ["None", "Sepia", "Invert", "Contrast", "Huerotate", "Saturate", "Prince", "Hulk", "Grapefruit", "Grayscale"]

	}


	onImageDrop(files) {
		console.log('onImageDrop happened')
		this.handleImageUpload(files[0])
	}

	handleImageUpload(file) {
		console.log('handleImageUpload happens')

		// request.post(to my server ).then(do stuff with signature)
		//signature attached to the end of cloudinary_url?

		// request.post('http://localhost:8080/photos')
				
		
		let upload = request.post(CLOUDINARY_UPLOAD_URL) //with signature
									.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
									.field('file', file)

		upload.end((err, response) => {
			console.log('upload finished')
			if (err) {
				console.log(err)
			}

			if(response.body.secure_url !== '') {
				console.log('about to dispatch action')
				this.props.dispatch(actions.saveImageUrl(response.body.secure_url))
			}
			console.log('end of upload callback')
		});
	}

	closePanel(){
		this.props.dispatch(actions.closePanel())
	}

	savePanel() {
		if (this.props.id === "newStrip" ) {
			console.log('newStrip postPanel')
			this.props.dispatch(actions.postPanel(this.props))
		} else {
			this.props.dispatch(actions.putPanel(this.props))
		}
		this.props.dispatch(actions.closePanel())
	}

	saveTextInProgress() {
		this.props.dispatch(actions.saveTextInProgress(text.innerText))
	}

	saveFilterInProgress (e) {
		e.preventDefault()
    	this.props.dispatch(actions.saveFilterInProgress(e.target.value));
  	}

	render () {
		let options = this.filters.map(name => <option key={name} value={name} className="filter-option">{name}</option>)
		return (
			<div className="panel-container">
				<img id="upload-image" className={this.props.filter} src={this.props.imgUrl} />
				  <select
				  	className="filters-dropdown"
				   selected={value} 
        			onChange={this.saveFilterInProgress.bind(this)}>
        				{options}
			      </select>
					<div className="comic-text-box" contentEditable="true" onBlur={this.saveTextInProgress.bind(this)} suppressContentEditableWarning={true} ref={element => text = element}>{this.props.text}</div>
				<ImageUpload onDrop={this.onImageDrop.bind(this)} />
				<div className="save-cancel-button-container-panels">
					<button className="save-panel-button" onClick={this.savePanel}>Save</button>
					<button className="cancel-panel-button" onClick={this.closePanel}>Cancel</button>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state, props) => ({
  text: 	state.strip.panelInProgress.text,
  imgUrl: state.strip.panelInProgress.imgUrl,
  filter: state.strip.panelInProgress.filter,
	_id:		state.strip.panelInProgress._id,
	id:			state.strip.panelInProgress.id
})

export default connect(mapStateToProps)(PanelContainer)

