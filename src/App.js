import React from 'react';
import Button from './components/Button.js';
import Card from './components/Card.js';
import './App.scss';
import Fujita from './images/fujita_nikoru.jpg'
import Komatsu from './images/komatsu_nana.png'
import Ayaka from './images/ayaka.jpg'
import Mei from './images/mei.jpg'
import Yuko from './images/yuko.jpg'

/**
 * アプリケーションの状態を管理
 */
export default class App extends React.Component {
  constructor() {
    super();
    // 初期状態を定義します
    this.state = {
      opened : false,
      // 指で動かしている時の移動距離.
      deltaX: 0,
      deltaY: 0,
      // スワイプされた状態の場合にtrue.
      swipeCard: {
        id: '',
        name: '',
        age: '',
        description: '',
        image_url: '',
      },
      //奥側にあるカード
      backCard: {
        id: '',
        name: '',
        age: '',
        description: '',
        image_url: '',
      }
    }
  }

  changePerson(firstPerson, secondPerson) {
    this.setState({
      swipeCard: {
        id: firstPerson.id,
        name: firstPerson.name,
        age: firstPerson.age,
        description: firstPerson.description,
        image_url: firstPerson.image_url,
      },
      backCard: {
        id: secondPerson.id,
        name: secondPerson.name,
        age: secondPerson.age,
        description: secondPerson.description,
        image_url: secondPerson.image_url,
      }
    });
  }

  changeCardState(value) {
    this.setState(
      {
        opened : value.opened,
        // 指で動かしている時の移動距離.
        deltaX: value.deltaX,
        deltaY: value.deltaY,
      }
    );
  }

  componentDidMount() {
    let img = new Image();
    const images = [Fujita, Komatsu, Ayaka, Mei, Yuko];
    let src;
    for (let i = 0; i < images.length; i++){
      src = images[i]
      img.src = src;
      console.log(images[i])
    }
  }

  async shouldComponentUpdate(nextProps, nextState) {
    // if (nextState.opened === false) {
    //   const img = new Image();
    //   const src = nextState.swipeCard.image_url;
    //   img.src = src // ここでプリロードが始まる
    //   // const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
    //   // await sleep(500000);
    //   // console.log('newxt state');
    //   // img.onload = () => { // 読み込み完了時に発火する関数
    //   return true;
    // } else {
    //   console.log("始めだけ");
    //   return false;
    // }
  }

  render() {
    return (
      <div className="App">
        <Card 
          changePersonState={(firstPerson, secondPerson) => this.changePerson(firstPerson, secondPerson)}
          changeCardState={(value) => this.changeCardState(value)}
          backCardId={this.state.backCard.id}
          backCardName={this.state.backCard.name}
          backCardAge={this.state.backCard.age}
          backCardDescription={this.state.backCard.description}
          backCardImageUrl={this.state.backCard.image_url}
          swipeCardName={this.state.swipeCard.name}
          swipeCardDescription={this.state.swipeCard.description}
          swipeCardAge={this.state.swipeCard.age}
          swipeCardImageUrl={this.state.swipeCard.image_url}
          opened={this.state.opened}
          deltaX={this.state.deltaX}
          deltaY={this.state.deltaY}
        />
        <Button 
          changePersonState={(firstPerson, secondPerson) => this.changePerson(firstPerson, secondPerson)}
          changeCardState={(value) => this.changeCardState(value)}
          deltaX={this.state.deltaX}
          deltaY={this.state.deltaY}
        />
      </div>
    );
  }  
}

// class Button2 extends React.Component {
//   constructor(props){
//     super(props)
//     this.onClickHandler = this.onClickHandler.bind(this)
//   }
  
//   onClickHandler(){
//     this.props.onClick("Button2")
//   }
  
//   render() {
//     return (
//         <button onClick={this.onClickHandler} id="button2">
//             BUTTON2!!
//         </button>
//     )
//   }
// }

// class Button1 extends React.Component {
  
//   constructor(props){
//     super(props)
//     this.onClickHandler = this.onClickHandler.bind(this)
//   }
  
//   onClickHandler(){
//     this.props.onClick('Button1')
//   }
  
//   render() {
//     return (
//         <button onClick={this.onClickHandler} id="button1">
//             BUTTON1!!
//         </button>
//     )
//   }
// }

// class App extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       showButton : true,
//       hide: false
//     }
//     this.changeButtonState = this.changeButtonState.bind(this)
//     this.getButton = this.getButton.bind(this)
//     this.transitionEndEventName = this.transitionEndEventName.bind(this)
//     this.hideApp = this.hideApp.bind(this)
//     this.removeEvent = this.removeEvent.bind(this)
//   }
  
//   getButton() {
//     if (this.state.showButton){
//         return <Button1 onClick={this.hideApp}/>
//       } else {
//         return <Button2 onClick={this.hideApp}/>
//       }
//   }
  
//   transitionEndEventName () {
//     var el = document.createElement('div')//what the hack is bootstrap

//     var transEndEventNames = {
//       WebkitTransition : 'webkitTransitionEnd',
//       MozTransition    : 'transitionend',
//       OTransition      : 'oTransitionEnd otransitionend',
//       transition       : 'transitionend'
//     }

//     for (var name in transEndEventNames) {
//       if (el.style[name] !== undefined) {
//         return transEndEventNames[name];
//       }
//     }

//     return false // explicit for ie8 (  ._.)
// }
 
  
//   hideApp(button) {
//     var app = document.getElementById('main')
//     var transitionEnd = this.transitionEndEventName()
//     app.addEventListener(transitionEnd, this.removeEvent, false)
// 		app.classList.contains('show-element') ? app.classList.remove('show-element') : null
// 		app.classList.add('remove-element')
//   }
  
//   removeEvent(){
//     console.log('hey')
//     var app = document.getElementById('main')
//     var transitionEnd = this.transitionEndEventName()
//     app.removeEventListener(transitionEnd, this.removeEvent, false)
//     this.changeButtonState()
//   }
  
//   changeButtonState(button) {
//     this.setState({
//       showButton: !this.state.showButton,
//       hide: true
//     })
//   }
  
//   componentDidUpdate(){
//     var app = document.getElementById('main')
//     app.classList.contains('remove-element') ? app.classList.remove('remove-element') : null
//     app.classList.add('show-element')
//   }
  
//   render(){
//     var button = this.getButton()
//     return (
//         <div id="button-container">
//             {button}
//         </div>
//     )
//   }
// }

// ReactDOM.render(<App />, document.getElementById('main'))