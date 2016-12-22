
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

		this.switchGrayscale = this.switchGrayscale.bind(this);
		this.switchInvert = this.switchInvert.bind(this);
		this.switchContrast = this.switchContrast.bind(this);
		this.switchHuerotate = this.switchHuerotate.bind(this);
		this.switchSepia = this.switchSepia.bind(this);
		this.closePanel = this.closePanel.bind(this)

		this.filters = [
			["grayscale", this.switchGrayscale],
			["sepia", this.switchSepia]
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
		this.setState({
			filter: 'grayscale'
		})
	}

	switchInvert() {
		this.setState({
			filter: 'invert'
		})
	}

	switchContrast() {
		this.setState({
			filter: 'contrast'
		})
	}

	switchHuerotate(){
		this.setState({
			filter: 'huerotate'
		})
	}

	switchSepia(){
		this.setState({
			filter: 'sepia'
		})
	}

	handleSubmit (event) {
		event.preventDefault();
		this.setState({
			text: text.innerText.trim(),
			edits: "false"
		})
	}

	closePanel(){
		console.log('close panel called')
		this.props.dispatch(
			actions.closePanel())
	}

	savePanel() {
		console.log(this.props)
		this.props.dispatch(
			actions.postPanel(this.props)
		)
	}

	render () {
		return (
			<div className="panel-container">
				<img className={this.props.filter} src={this.props.imgUrl} />
				<div className="button-container">
				
					<button className="filter-button" onClick={this.switchGrayscale}>Grayscale</button>
					<button className="filter-button" onClick={this.switchInvert}>Invert</button>
					<button className="filter-button" onClick={this.switchContrast}>Contrast</button>
					<button className="filter-button" onClick={this.switchHuerotate}>Huerotate</button>
					<button className="filter-button" onClick={this.switchSepia}>Sepia</button>
				</div>
				<form className="description-form" onSubmit={this.handleSubmit.bind(this)}>
					<div className="story-description" contentEditable={this.props.edits} suppressContentEditableWarning={true} ref={element => text = element}>{this.props.text}</div>
					<input className="save-description-button" type="submit" value="Save description" />
      		</form>
      		<button className="edit-description-button">Edit description</button>
				<ImageUpload onDrop={this.onImageDrop.bind(this)} />
				<button className="save-panel-button">Save panel</button>
				<button className="cancel-panel-button" onClick={this.closePanel}>Cancel</button>
			</div>
		)
	}
}


const mapStateToProps = (state, props) => ({
  text: state.strip.panelInProgress.text,
  imgUrl: state.strip.panelInProgress.imgUrl, 
  filter: state.strip.panelInProgress.filter
})

export default connect(mapStateToProps)(PanelContainer)

		// {this.filter.map(([name, func]) => <button className="filter-button" onClick={func}>name</button>)}
