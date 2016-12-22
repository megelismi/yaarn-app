import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actions.js';
import PanelContainer from './panel-container'
import ComicPreview from './comic-preview'

export class IndividualBoard extends React.Component {
  constructor(props) {
    super(props)
    }

    componentDidMount() {
      this.props.dispatch(actions.getPanel());
    }


    render() {

      let panelsList = this.props.panels.map((panel, index) => {
        return (
          <ComicPreview key={index} content={panel} />
        )
      })

      return (
        <div className="indivBoard">
          <ul className="listOfPanels">
            {panelsList}
            <ComicPreview content={this.props.newPanel}/>
          </ul>
           {this.props.modalUp ? <PanelContainer /> : null}
        </div>
      )
    }
}


const mapStateToProps = (state, props) => ({
	panels: state.strip.panels,
  newPanel: state.strip.newPanel,
  panelInProgress: state.strip.panelInProgress,
  modalUp: state.strip.modalUp
})

export default connect(mapStateToProps)(IndividualBoard)


