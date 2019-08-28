import Fujita from '../images/fujita_nikoru.jpg'
import Komatsu from '../images/komatsu_nana.png'
import Ayaka from '../images/ayaka.jpg'
import Mei from '../images/mei.jpg'
import Yuko from '../images/yuko.jpg'
export let People;
People = [
  {
    id:1, 
    name: '小松菜奈',
    age: 25,
    description: '音楽 / 演劇 / 洋服',
    image_url: Komatsu,
  },
  {
    id:2, 
    name: '藤田ニコル',
    age: 21,
    description: 'にこるん。21才。',
    image_url: Fujita,
  },
  {
    id:3, 
    name: 'あやか',
    age: 22,
    description: '美容師',
    image_url: Ayaka,
  },
  {
    id:4, 
    name: 'めい',
    age: 26,
    description: '保育園の先生\n最近カフェ探しにはまっているので良いカフェあったら教えてください！',
    image_url: Mei,
  },
  {
    id:5, 
    name: 'ゆうこ',
    age: 19,
    description: '今日夜飲みに行こうよ',
    image_url: Yuko,
  },
]
export let SWIPED_DISTANCE;
SWIPED_DISTANCE = 300