import React from 'react'
import Form from './form'
import ImageUpload from './image-upload'
import RichEditorExample from './description'
import {connect} from 'react-redux'
import * as actions from '../actions/actions'
let text = ""
class MainContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			class: '',
			text: '', 
			imgUrl: '',
			edits: 'false',
			textBoxRef: ""
		}
		this.switchGrayscale = this.switchGrayscale.bind(this);
		this.switchInvert = this.switchInvert.bind(this);
		this.switchContrast = this.switchContrast.bind(this);
		this.switchHuerotate = this.switchHuerotate.bind(this);
		this.switchSepia = this.switchSepia.bind(this);
		this.onInputSubmit = this.onInputSubmit.bind(this);
	}

	onInputSubmit(textInput) {
		this.setState({
			text: textInput
		})
	}

	switchGrayscale() {
		this.setState({
			class: 'grayscale'
		})
	}

	switchInvert() {
		this.setState({
			class: 'invert'
		})
	}

	switchContrast() {
		this.setState({
			class: 'contrast'
		})
	}

	switchHuerotate(){
		this.setState({
			class: 'huerotate'
		})
	}

	switchSepia(){
		this.setState({
			class: 'sepia'
		})
	}

	handleSubmit (event) {
		event.preventDefault();
		this.setState({
			text: text.innerHTML.trim(),
			edits: "false"
		})
	}

	makeEdits() {
		this.setState({
			edits: "true"
		})
	}

	componentDidMount() {
		this.props.dispatch(
			actions.fetchMessage())
	}

	render () {
		// console.log('state from main-container', this.state)
		return (
			<div className="main-container">
				<p>{this.props.message}</p>
				<img className={this.state.class} src="http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg" />
				<div className="button-container">
					<button className="filter-button" onClick={this.switchGrayscale}>Grayscale</button>
					<button className="filter-button" onClick={this.switchInvert}>Invert</button>
					<button className="filter-button" onClick={this.switchContrast}>Contrast</button>
					<button className="filter-button" onClick={this.switchHuerotate}>Huerotate</button>
					<button className="filter-button" onClick={this.switchSepia}>Sepia</button>
				</div>
				<form className="description-form" onSubmit={this.handleSubmit.bind(this)}>
					<div className="story-description" contentEditable={this.state.edits} onFocus={this.makeEdits.bind(this)} suppressContentEditableWarning={true} ref={element => text = element}>Add your story...</div>
					<input className="submit-button" type="submit" value="Save" />
      		</form>
      		<button className="edit-button" onClick={this.makeEdits.bind(this)}>Edit</button>
				<ImageUpload />
				<RichEditorExample />
			</div>
		)
	}
}


const mapStateToProps = (state, props) => ({
	message: state.message
})

export default connect(mapStateToProps)(MainContainer)
