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

/* 显示控件 */
class ShowMain extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showData:"中午吃什么呢?",
      unRandomRun:true
    };
  };
  changeShow(){
    this.setState({unRandomRun:false});
    setInterval(() => {
      this.setState({showData:randomArray(FOODARRAY)});
    },1000);
  };
  render(){
    if(this.state.unRandomRun && this.props.showToggle)
       this.changeShow();
    return (
      <div className="info-show-div">
        {this.state.showData}
      </div>
    );
  }
}

/* 中间控件 */
class RandomMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showToggle:false
    };
  };
  showInfo(){
    this.setState({showToggle:!this.state.showToggle});
  };
  render() {
    return (
      <div className="info-main-div">
        <ShowMain className="info-show-div" showToggle={this.state.showToggle} />
        <button className="info-control-button" onClick={this.showInfo.bind(this)}>看看吃啥</button>
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
