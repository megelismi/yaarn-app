
import React from 'react'
import ImageUpload from './image-upload'
import RichEditorExample from './text-editor'
import LinkEditorExample from './test-editor'
import {connect} from 'react-redux'
import * as actions from '../actions/actions'
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'e7zwclsa';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/megelismi/upload';


let text = ""

class PanelContainer extends React.Component {
	constructor(props) {
		super(props)

		this.switchGrayscale = this.switchGrayscale.bind(this)
		this.switchInvert = this.switchInvert.bind(this)
		this.switchContrast = this.switchContrast.bind(this)
		this.switchHuerotate = this.switchHuerotate.bind(this)
		this.switchSepia = this.switchSepia.bind(this)
		this.closePanel = this.closePanel.bind(this)
		this.savePanel =	this.savePanel.bind(this)

		this.filters = [
			["Grayscale", this.switchGrayscale],
			["Sepia", this.switchSepia],
			["Invert", this.switchInvert],
			["Contrast", this.switchContrast],
			["Huerotate", this.switchHuerotate]
		]
	}


	onImageDrop(files) {
		console.log('onImageDrop happened')
		this.handleImageUpload(files[0])
	}

	handleImageUpload(file) {
		console.log('handleImageUpload happens')
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
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


	switchGrayscale() {
		this.props.dispatch(actions.applyGrayscale())
	}

	switchInvert() {
		this.props.dispatch(actions.applyInvert())
	}

	switchContrast() {
		this.props.dispatch(actions.applyContrast())
	}

	switchHuerotate(){
		this.props.dispatch(actions.applyHuerotate())
	}

	switchSepia(){
		this.props.dispatch(actions.applySepia())
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

		// handleSubmit (event) {
	// 	event.preventDefault();
	// 	this.setState({
	// 		text: text.innerText.trim(),
	// 		edits: "false"
	// 	})
	// }

	saveTextInProgress() {
		this.props.dispatch(actions.saveTextInProgress(text.innerText))
	}

	render () {
		return (
			<div className="panel-container">
				<img className={this.props.filter} src={this.props.imgUrl} />
				<div className="filter-button-container">
				{this.filters.map(([name, func]) => <button key={name} className="filter-button" onClick={func}>{name}</button>)}
				</div>
				{/*<form className="description-form">*/}
					<div className="comic-text-box" contentEditable="true" onBlur={this.saveTextInProgress.bind(this)} suppressContentEditableWarning={true} ref={element => text = element}>{this.props.text}</div>
				{/*<input className="save-description-button" type="submit" value="Save description" />
      		</form>
      		<button className="edit-description-button">Edit description</button>*/}
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
