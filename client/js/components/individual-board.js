import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actions.js';
// import PanelContainer from './panel-container'

export default class IndividualBoard extends React.Component {
  constructor(props) {
    super(props)
    }

    componentDidMount() {
      this.props.dispatch(actions.fetchPanels());
    }

    render() {
      //map out array of panels here
      // let panelsList = {
      //         <li>
      //             <img className="panelImage" src= ></img>
      //             <div className="caption"></div>
      //             <button type="button">Edit</button>
      //             <button type="button">Previous</button>
      //             <button type="button">Next</button>
      //         </li>
      // }
      return (
        <div className="indivBoard">
          <ul className="listOfPanels">
            <li>
                <img className="panelImage" src= "http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg"></img>
                <div className="caption">Puppy</div>
                <button type="button">Edit</button>
                <button type="button">Previous</button>
                <button type="button">Next</button>
            </li>
          </ul>
        </div>
      )

    }
}

// const mapStateToProps = (state, props) => ({
// 	message: state.message
// })
//
// export default connect(mapStateToProps)(IndividualBoard)
