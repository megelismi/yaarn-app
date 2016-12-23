
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

		// this.state = {
		// 	selectValue: 'Radish'
		// }

		this.switchGrayscale = this.switchGrayscale.bind(this)
		this.switchInvert = this.switchInvert.bind(this)
		this.switchContrast = this.switchContrast.bind(this)
		this.switchHuerotate = this.switchHuerotate.bind(this)
		this.switchSepia = this.switchSepia.bind(this)
		this.switchSaturate = this.switchSaturate.bind(this)
		this.switchGrapefruit = this.switchGrapefruit.bind(this)
		this.switchHulk = this.switchHulk.bind(this)
		this.switchPrince = this.switchPrince.bind(this)
		this.switchNone = this.switchNone.bind(this)
		this.closePanel = this.closePanel.bind(this)
		this.savePanel =	this.savePanel.bind(this)

		this.filters = [
			["Grayscale", this.switchGrayscale],
			["Sepia", this.switchSepia],
			["Invert", this.switchInvert],
			["Contrast", this.switchContrast],
			["Huerotate", this.switchHuerotate]
		]

		this.filters2 = [
			["Saturate", this.switchSaturate],
			["Prince", this.switchPrince],
			["Hulk", this.switchHulk],
			["Grapefruit", this.switchGrapefruit],
			["None", this.switchNone]
		]

	}


	onImageDrop(files) {
		console.log('onImageDrop happened')
		this.handleImageUpload(files[0])
	}

	handleImageUpload(file) {
		console.log('handleImageUpload happens')

		// request.post(to my server ).then(do stuff with signature)
		//signature attached to the end of cloudinary_url?

		request.post('http://localhost:8080/photos')
				
		
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


	switchGrayscale() {
		this.props.dispatch(actions.applyGrayscale())
	}

	switchSepia(){
		this.props.dispatch(actions.applySepia())
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

	switchGrapefruit(){
		this.props.dispatch(actions.applyGrapefruit())
	}

	switchHulk(){
		this.props.dispatch(actions.applyHulk())
	}

	switchPrince(){
		this.props.dispatch(actions.applyPrince())
	}

	switchNone(){
		this.props.dispatch(actions.applyNone())
	}

	switchSaturate(){
		this.props.dispatch(actions.applySaturate())
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
    	this.props.dispatch(actions.saveFilterInProgress(e.target.value));
  	}

	render () {
		return (
			<div className="panel-container">
				<img className={this.props.filter} src={this.props.imgUrl} />
				  <select
				   value={value} 
        			onChange={this.saveFilterInProgress.bind(this)}>
			       	<option value="Grayscale">Grayscale</option>
			        	<option value="Sepia">Sepia</option>
			        	<option value="Invert">Invert</option>
			        	<option value="Invert">Contrast</option>
			        	<option value="Huerotate">Huerotate</option>
			        	<option value="Saturate">Saturate</option>
			        	<option value="Prince">Prince</option>
			        	<option value="Hulk">Hulk</option>
			        	<option value="Grapefruit">Grapefruit</option>
			        	<option value="None">None</option>
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




{/*var FruitSelector = React.createClass({
    getInitialState:function(){
      return {selectValue:'Radish'};
  },
    handleChange:function(e){
    this.setState({selectValue:e.target.value});
  },
  render: function() {
    var message='You selected '+this.state.selectValue;
    return (
      <div>
      <select 
        value={this.state.selectValue} 
        onChange={this.handleChange} 
      >
       <option value="Orange">Orange</option>
        <option value="Radish">Radish</option>
        <option value="Cherry">Cherry</option>
      </select>
      <p>{message}</p>
      </div>        
    );
  }
});



React.render(<FruitSelector name="World" />, document.body);/ */}

{/*<div className="filter-button-container">
				{this.filters.map(([name, func]) => <button key={name} className="filter-button" onClick={func}>{name}</button>)}
				</div>
				<div className="filter-button-container">
				{this.filters2.map(([name, func]) => <button key={name} className="filter-button" onClick={func}>{name}</button>)}
				</div>*/}
