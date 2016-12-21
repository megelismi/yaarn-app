import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actions.js';

export class ComicPreview extends React.Component {
  constructor(props) {
    super(props)
    this.deletePanel = this.deletePanel.bind(this)
    this.editPanel = this.editPanel.bind(this)
  }

  deletePanel(id) {
    console.log('delete panel called on', id)
    this.props.dispatch(
      actions.deletePanel(id))
  }

  editPanel(content) {
    // this.setState({
    //   editPanel: true
    // })
    console.log(this.props)
    this.props.dispatch(actions.savePanelInProgress(content))
  }

  render() {

    return (
      <li >
        <div className="strip-panel-img"><img className="strip-images" src={this.props.content.imgUrl} />
          <p className="strip-description">{this.props.content.text}</p>
           <button className="strip-button" onClick={this.editPanel(this.props.content)} >Edit</button>
           <button className="strip-button" onClick={() => {this.deletePanel(this.props.content._id)}} >Delete</button>
        </div>
      </li>
    )
  }
}

export default connect()(ComicPreview)
