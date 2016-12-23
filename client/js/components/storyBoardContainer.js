import React, { Component } from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actions.js';

const class StoryBoard extends Component {
  
}


const mapStateToProps = (state, props) => ({
	panels: state.strip.panels,
  newPanel: state.strip.newPanel,
  panelInProgress: state.strip.panelInProgress,
  modalUp: state.strip.modalUp
})

export default connect(mapStateToProps)(StoryBoards)
