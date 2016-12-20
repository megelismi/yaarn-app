import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actions.js';
import PanelContainer from './panel-container'

export class IndividualBoard extends React.Component {
  constructor(props) {
    super(props)
    }

    // componentDidMount() {
    //   this.props.dispatch(actions.fetchPanels());
    // }

    render() {
      let panelsList = this.props.panels.map((panel, index) => {
        return <li> <PanelContainer filter={panel.filter} imgUrl={panel.imgUrl} edits={panel.edits} text={panel.text} /> </li> })
      
      return (
        <div className="indivBoard">
          <ul className="listOfPanels">
            {panelsList}
          </ul>
        </div>
      )

    }
}
 

              // <li>
              //     <img className="panelImage" src= ></img>
              //     <div className="caption"></div>
              //     <button type="button">Edit</button>
              //     <button type="button">Previous</button>
              //     <button type="button">Next</button>
              // </li>
const mapStateToProps = (state, props) => ({
	panels: state.strip.panels
})

export default connect(mapStateToProps)(IndividualBoard)
