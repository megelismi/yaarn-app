
import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actions.js';

export class ComicPreview extends React.Component {
  constructor(props) {
    super(props)
    this.deletePanel = this.deletePanel.bind(this)
    this.editPanel = this.editPanel.bind(this)
    this.newPanelId = this.props.content.id
    // this.checkIfNew = this.checkIfNew.bind(this)
    this.newPanel = this.newPanel.bind(this)
  }

  deletePanel(id) {
    console.log('delete panel called on', id)
    this.props.dispatch(
      actions.deletePanel(id))
  }

  editPanel(content) {
    this.props.dispatch(actions.savePanelInProgress(content))
  }

  newPanel() {
    this.props.dispatch(actions.createNewPanel())
  }

  render() {

    return (
      <li>
        <div className="strip-panel-img"><img className="strip-images" src={this.props.content.imgUrl} />
          <p className="strip-description">{this.props.content.text}</p>
          {this.newPanelId === 'newStrip' ? <button className="strip-button" onClick={() => this.newPanel()}>New</button> :
            <div>
              <button className="strip-button" onClick={() => {this.editPanel(this.props.content)}}>Edit</button>
              <button className="strip-button" onClick={() => {this.deletePanel(this.props.content._id)}}>Delete</button>
            </div>
          }
        </div>
      </li>
    )
  }

}


export default connect()(ComicPreview)
