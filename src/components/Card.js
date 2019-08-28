import React from 'react';
import Hammer from 'react-hammerjs'
import './Card.scss';
import Loader from 'react-loader-spinner'
import { People, SWIPED_DISTANCE } from '../common/constant';
import Fujita from '../images/fujita_nikoru.jpg'
import Komatsu from '../images/komatsu_nana.png'
import Ayaka from '../images/ayaka.jpg'
import Mei from '../images/mei.jpg'
import Yuko from '../images/yuko.jpg'

/**
 * カードのコンポーネント
 */
export default class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      render: true
    }
  }
  // 指でのドラッグが始まった時
  onPanStart(e) {
    console.log(this.props.backCardId);
    console.log("タッチスタート");
    // 最初のCardの位置
    this.props.changeCardState({
      opened : false,
      deltaX : 0,
      deltaY : 0
    })
  }

  // 指でドラッグしている間
  onPan(e) {
    // 指で動かした分だけ、移動距離を変化させます.
    this.props.changeCardState({
      opened : false,
      deltaX : 0 + e.deltaX,
      deltaY : 0 + e.deltaY
    })
  }

  // ドラッグ終了
  onPanEnd(e) {
    // 移動量に応じて、openedの状態を変更します.

    // SWIPED_DISTANCE px の半分の動きがあれば、左にスワイプ
    if (e.deltaX <= -1 * SWIPED_DISTANCE / 2) {
      this.props.changeCardState({
        opened : true,
        deltaX : -4 * SWIPED_DISTANCE,
        deltaY : 0,
      })
    // SWIPED_DISTANCE px の半分の動きがあれば、右にスワイプ
    } else if (e.deltaX >= 1 * SWIPED_DISTANCE / 2) {
      this.props.changeCardState({
        opened : true,
        deltaX : 4 * SWIPED_DISTANCE,
        deltaY : 0,
      })
    // スワイプ量が少なければ、opened状態はそのまま
    } else {
      this.props.changeCardState({
        opened : false,
        deltaX : 0,
        deltaY : 0
      })
    }
  }

  // アニメーション終了時
  async onTransitionEnd() {
    await this.setState({render: false});
    await this.changeCardPerson();
    // カードを初期状態に戻す
    if (this.props.opened === true) {
      this.props.changeCardState({
        opened : false,
        deltaX : 0,
        deltaY : 0
      });
    }
    let img = new Image();;
    img.src = this.props.swipeCardImageUrl;
    img.onload = () => { // 読み込み完了時に発火する関数
      this.setState({render: true});
    }
  }

  // カードの移動後に2枚目のカードのstateを一枚目に渡し、ランダムで2枚目のカードを選ぶ
  async changeCardPerson() {
    const peopleArray = People;
    // 前のカードを定義
    const firstPerson = {
      id: this.props.backCardId,
      name: this.props.backCardName,
      age: this.props.backCardAge,
      description: this.props.backCardDescription,
      image_url: this.props.backCardImageUrl,
    };
    
    // 後ろのカードで選ばれている人を除いた配列から、後ろのカードの人物を定義
    const filteredPeopleArray = await peopleArray.filter((e) => e.id !== this.props.backCardId);
    const secondRandomNumber = Math.floor( Math.random() * (peopleArray.length - 1));
    const secondPerson = filteredPeopleArray[secondRandomNumber];
    this.props.changePersonState(firstPerson, secondPerson);
  }

  // popUpを表示
  popUpShow() {
    document.querySelector(".popUp").classList.add("fadeIn");
  }

  // popUpを非表示
  popUpClose() {
    console.log('popup succes');
    document.querySelector(".popUp").classList.remove("fadeIn");
  }

  async componentDidMount() {
    const peopleArray = People;
    // 前のカードに表示する人の id をランダムで選び、前のカードの人物を決定
    const firstRandomNumber = await Math.floor( Math.random() * People.length );
    const firstPerson = peopleArray[firstRandomNumber];

    // 後ろのカードに表示する人の id をランダムで選び、後ろのカードの人物を決定
    const secondRandomNumber = await Math.floor( Math.random() * (People.length - 1)  ) ;
    const filteredPeopleArray = await peopleArray.filter((e) => e.id !== (firstRandomNumber + 1));
    const secondPerson = filteredPeopleArray[secondRandomNumber];
    // カードに選ばれている人の状態を変更
    this.props.changePersonState(firstPerson, secondPerson);
    // ローダーの削除
    document.querySelector('.loader').remove();
  }

  // render タイミングの制御
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.render === true) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    // スワイプの量に合わせて、要素の位置を変更
    let frontStyle = {
      transform : `translate(${this.props.deltaX}px, ${this.props.deltaY}px)`,
      transitionDuration: `${this.props.opened === true ? '0.3s'  : '0s'}`,
    };
    console.log("render されたよ")
    return (
      <>
        <div className="popUp">
          <div className="popUp__img">
            <img src={this.props.swipeCardImageUrl} alt=""/>
          </div>
          <div className="popUp__detail">
            <button onClick={this.popUpClose.bind(this)}>↓</button>
            <h1>{this.props.swipeCardName} {this.props.swipeCardAge}</h1>
            <p>{this.props.swipeCardDescription}</p>
          </div>
        </div>
        <div className="card__field">
          <Loader
            className="loader"
            type="Puff"
            color="#FF5864"
            height={100}
            width={100}
          />
          <div className="card card__back" >
            <div className="card__hero">
            <img src={this.props.backCardImageUrl} alt=""/>
            </div>
            <div className="card__detail">
            <div className="card__detail__name">{this.props.backCardName}</div>
            <div className="card__detail__age">{this.props.backCardAge}</div>
            </div>
          </div>
          <Hammer
            onPanStart={this.onPanStart.bind(this)} 
            onPan={this.onPan.bind(this)} 
            onPanEnd={this.onPanEnd.bind(this)}
            onTap={this.popUpShow.bind(this)}>
              <div className="card card__swipe" style={frontStyle} onTransitionEnd={this.onTransitionEnd.bind(this)}>
                <div className="card__hero">
                  <img src={this.props.swipeCardImageUrl} alt=""/>
                </div>
                <div className="card__detail">
                  <div className="card__detail__name">{this.props.swipeCardName}</div>
                  <div className="card__detail__age">{this.props.swipeCardAge}</div>
                </div>
              </div>
          </Hammer>
        </div>
      </>
    );
  }
} 