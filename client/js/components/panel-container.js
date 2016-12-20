
import React from 'react'
import ImageUpload from './image-upload'
import RichEditorExample from './text-editor'
import LinkEditorExample from './test-editor'
import {connect} from 'react-redux'
import * as actions from '../actions/actions'
let text = ""

class PanelContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			filter: '',
			text: '', 
			imgUrl: '',
			edits: 'false'
		}
		this.switchGrayscale = this.switchGrayscale.bind(this);
		this.switchInvert = this.switchInvert.bind(this);
		this.switchContrast = this.switchContrast.bind(this);
		this.switchHuerotate = this.switchHuerotate.bind(this);
		this.switchSepia = this.switchSepia.bind(this);
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
		console.log('state from main-container', this.state)
		return (
			<div className="main-container">
				<p>{this.props.message}</p>
				<img className={this.state.filter} src="http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg" />
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
			</div>
		)
	}
}


const mapStateToProps = (state, props) => ({
	panel: state.board.panel
})

export default connect(mapStateToProps)(PanelContainer)

// Storyboard Component
<div>
	{this.props.panels.map((panel) =>{<PanelContainer filter={panel.filter} image={panel.image}})}
</div>

