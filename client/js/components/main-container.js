import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions.js';

export class MainContainer exends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.props.dispatch(actions.fetchBoards());
    }

    render(props) {
      // map out array of indivual story board here
      let boardList = this.props.board.map((board, index) => {
        return <li key={index}> {board} </li>
      });

      return(
        <div className="storyBoard"
          <ul className="listOfBoards">
            {boardList}
          </ul>
        </div>
      )
    }
}
