import React from 'react';
import Heart from '../images/heart.png';
import Cross from '../images/cross.png';
import './Button.scss';
import { SWIPED_DISTANCE } from '../common/constant';

/**
 * ボタンのコンポーネント
 */
export default class Button extends React.Component {
  // Likeボタンを押したした時
  like() {
    this.props.changeCardState({
      opened : true,
      deltaX : 3 * SWIPED_DISTANCE,
      deltaY : 0,
    })
  }

  // Nopeボタンを押した時
  nope() {
    this.props.changeCardState({
      opened : true,
      deltaX : -3 * SWIPED_DISTANCE,
      deltaY : 0,
    })
  }
  render() {
    return (
      <div className="buttons">
        <div className="button button--nope" onClick={this.nope.bind(this)}>
          <img src={Cross} alt="" />
        </div>
        <div className="button button--like" onClick={this.like.bind(this)}>
          <img src={Heart} alt="" />
        </div>
      </div>
    );
  }
} 