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