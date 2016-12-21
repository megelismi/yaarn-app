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
    
    }

    // componentDidMount() {
    //   this.props.dispatch(actions.fetchPanels());
    // }

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

    deletePanel() {
      console.log('deleted')
    }

    render() {
      console.log('state', this.state)
      let panelsList = this.props.panels.map((panel, index) => {
        return <li key={index}>
          <div className="strip-panel-img"><img className="strip-images" src={panel.imgUrl} />
            <p className="strip-description">{panel.text}</p>
             <button className="strip-button" onClick={this.editPanel.bind(this)} >Edit</button>
             <button className="strip-button" onClick={this.deletePanel.bind(this)} >Delete</button>
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

// // Using inline-styles for state
// <li className='todo-list__item'
//  style={(item.complete) ? styles.complete : {}} />

const mapStateToProps = (state, props) => ({
	panels: state.strip.panels
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
