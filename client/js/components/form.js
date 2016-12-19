import React from 'react';

const TextBox = props => {
	let inputBox

	const grabInput = event => {
		event.preventDefault();
		props.onSubmit(inputBox.value)
	}

	return (
		<div>
			<form className="user-form" onSubmit={grabInput}>
	  			<input className="user-input-box" type="text" placeholder="..." ref={element => inputBox = element} />
				<input className="submit-button" type="submit" value="Add story" />
			</form>
		</div>
	)
}

export default TextBox;

