require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
/*食物随机数组*/
const FOODARRAY = ["腊汁肉拌饭","淮南牛肉汤饭","老林子鸡鸡腿"];
/* 随机函数*/
let randomArray = array => {
  let index = Math.floor(Math.random()*array.length);
  return array[index];
};

/* 中间控件 */
class RandomMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showInfo:"中午吃什么呢?"
    };
  };
  changeShow(){
    setInterval(() => {
      this.setState({showInfo:randomArray(FOODARRAY)});
    },100);
  };
  render() {
    return (
      <div className="info-main-div">
        <div className="info-show-div">{this.state.showInfo}</div>
        <button className="info-control-button" onClick={this.changeShow.bind(this)}>看看吃啥</button>
      </div>
    );
  }
}

/* 主舞台控件 */
class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <RandomMain/>
      </div>
    );
  }
}

export default AppComponent;
