
import React from 'react'
import ImageUpload from './image-upload'
import RichEditorExample from './text-editor'
import LinkEditorExample from './test-editor'
import {connect} from 'react-redux'
import * as actions from '../actions/actions'
let text = ""

class NewPanelContainer extends React.Component {
	constructor(props) {
		super(props)

		this.switchGrayscale 	= this.switchGrayscale.bind(this)
		this.switchInvert 		= this.switchInvert.bind(this)
		this.switchContrast 	= this.switchContrast.bind(this)
		this.switchHuerotate 	= this.switchHuerotate.bind(this)
		this.switchSepia 			= this.switchSepia.bind(this)

		this.makeEdits 				= this.makeEdits.bind(this)
		this.savePanel				= this.savePanel.bind(this)
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
		event.preventDefault()
		this.setState({
			text: text.innerText.trim(),
			edits: "false"
		})
	}

	makeEdits() {
		this.setState({
			edits: "true"
		})
	}

	savePanel() {
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
					<div className="story-description" contentEditable={this.props.edits} onFocus={this.makeEdits()} suppressContentEditableWarning={true} ref={element => text = element}>{this.props.text}</div>
					<input className="save-description-button" type="submit" value="Save description" />
      		</form>
      		<button className="edit-description-button" onClick={this.makeEdits}>Edit description</button>
				<ImageUpload />
				<button className="save-panel-button" onClick={this.savePanel()}>Save panel</button>
				<button className="cancel-panel-button" onClick={this.props.cancelPanel}>Cancel</button>
			</div>
		)
	}
}


export default connect()(NewPanelContainer)
