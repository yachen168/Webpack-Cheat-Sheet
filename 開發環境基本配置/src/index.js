import _ from 'lodash';
import moduleA from './module/moduleA.js';
import '../assets/style.scss';
import ParrotImg from '../assets/parrot.jpeg';

function appendText(){
  document.querySelector('.content-entry').innerText='這是 entry 檔案內容'
}

function appendImg(){
  const parrotImgContainer = document.querySelector('.img-container')
  const parrotImg = new Image();
  parrotImg.src = ParrotImg

  parrotImgContainer.appendChild(parrotImg)
}

appendText()
appendImg()
moduleA()