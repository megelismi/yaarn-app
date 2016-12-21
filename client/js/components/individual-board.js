import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actions.js';
import PanelContainer from './panel-container'

export class IndividualBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editPanel: false
    }
    this.deletePanel = this.deletePanel.bind(this)
    this.editPanel = this.editPanel.bind(this)
    
    }

    componentDidMount() {
      this.props.dispatch(actions.getPanel());
      //cause new panel to be rendered
    }

    editPanel() {
      this.setState({
        editPanel: true
      })
    }

    cancelPanel() {
      this.setState({
        editPanel: false
      })
    }

    deletePanel(id) {
      console.log('delete panel called on', id)
      this.props.dispatch(
        actions.deletePanel(id))
    }

    render() {

      let panelsList = this.props.panels.map((panel, index) => {
        return <li key={panel._id}>
          <div className="strip-panel-img"><img className="strip-images" src={panel.imgUrl} />
            <p className="strip-description">{panel.text}</p>
             <button className="strip-button" onClick={this.editPanel} >Edit</button>
             <button className="strip-button" onClick={() => {this.deletePanel(panel._id)}} >Delete</button>
          </div>
        </li>
      })

      return (
        <div className="indivBoard">
          <ul className="listOfPanels">
            {panelsList}
          </ul>
          {this.state.editPanel ? <PanelContainer filter='' imgUrl='http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg' edits='true' text='you did it!' cancelPanel={this.cancelPanel.bind(this)} /> : null}
        </div>
      )
    }
}


const mapStateToProps = (state, props) => ({
	panels: state.strip.panels,
  newPanel: state.strip.newPanel
})

export default connect(mapStateToProps)(IndividualBoard)


// <PanelContainer filter={panel.filter} imgUrl={panel.imgUrl} edits={panel.edits} text= />

              // <li>
              //     <img className="panelImage" src= ></img>
              //     <div className="caption"></div>
              //     <button type="button">Edit</button>
              //     <button type="button">Previous</button>
              //     <button type="button">Next</button>
              // </li>
