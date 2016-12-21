import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actions.js';
import PanelContainer from './panel-container'
import ComicPreview from './comic-preview'
export class IndividualBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editPanel: false
    }
    // this.deletePanel = this.deletePanel.bind(this)
    // this.editPanel = this.editPanel.bind(this)

    }

    componentDidMount() {
      this.props.dispatch(actions.getPanel());
      //cause new panel to be rendered
    }

    // editPanel() {
    //   // this.setState({
    //   //   editPanel: true
    //   // })
    //   console.log(this.props)
    // }

    // cancelPanel() {
    //   this.setState({
    //     editPanel: false
    //   })
    // }

    // deletePanel(id) {
    //   console.log('delete panel called on', id)
    //   this.props.dispatch(
    //     actions.deletePanel(id))
    // }

    render() {

      let panelsList = this.props.panels.map((panel, index) => {
        return (
          <ComicPreview key={index} content={panel} />
        )
      })

      //variables filter, 

      return (
        <div className="indivBoard">
          <ul className="listOfPanels">
            {panelsList}
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
//<PanelContainer filter='' imgUrl='' edits='true' text='' cancelPanel={this.cancelPanel.bind(this)} /> 

