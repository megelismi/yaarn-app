import React from 'react';
import Dropzone from 'react-dropzone';


export default class ImageUpload extends React.Component {
	constructor(props) {
		super(props)
	
	}

	render() {
		console.log(this.state)
		return (
			<div className="FileUpload">
				<Dropzone
					className="image-upload"
					multiple={false}
					accept="image/*"
					onDrop={this.props.onDrop}>
					<p>Drop an image or click to select a file to upload. </p>
				</Dropzone>
			</div>
		)
	}
}
