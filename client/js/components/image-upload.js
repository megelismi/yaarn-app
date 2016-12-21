import React from 'react';
import Dropzone from 'react-dropzone';


export default class ImageUpload extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			uploadFileCloundinaryUrl: ''
		};
	}

	render() {
		console.log(this.state)
		return (
			<div className="FileUpload">
				<Dropzone
					multiple={false}
					accept="image/*"
					onDrop={this.props.onDrop}>
					<p>Drop an image or click to select a file to upload. </p>
				</Dropzone>
			</div>
		)
	}
}
