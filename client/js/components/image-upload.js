import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';


const CLOUDINARY_UPLOAD_PRESET = 'e7zwclsa';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/megelismi/upload';

export default class ImageUpload extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			uploadFileCloundinaryUrl: ''
		};
	}

	onImageDrop(files) {
		this.setState({
			uploadedFile: files[0]
		});
		
		this.handleImageUpload(files[0])
	}

	handleImageUpload(file) {
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
									.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
									.field('file', file)

		upload.end((err, response) => {
			if (err) {
				console.log(err)
			}

			if(response.body.secure_url !== '') {
				this.setState({
					uploadFileCloundinaryUrl: response.body.secure_url
				});
			}
		});
	}

	render() {
		return (
			<div className="FileUpload">
				<Dropzone
					multiple={false}
					accept="image/*"
					onDrop={this.onImageDrop.bind(this)}>
					<p>Drop an image or click to select a file to upload. </p>
				</Dropzone>
			</div>
		)
	}
}
