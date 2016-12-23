import 'babel-polyfill';

console.log(`Client running in ${process.env.NODE_ENV} mode`);

// require('dotenv').config();

import React from 'react';
import ReactDOM from 'react-dom';

import IndividualBoard from './components/individual-board'


import store from './store';
import {Provider} from 'react-redux';


document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
					<IndividualBoard />
		</Provider>,

		document.getElementById('app'))});
