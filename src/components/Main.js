require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
/*食物随机数组*/
const FOODARRAY = ["腊汁肉拌饭","淮南牛肉汤饭","老林子鸡鸡腿"];
/*间隔时间*/
const INTERVALTIME = 100;
/* 随机函数*/
let randomArray = array => {
  let index = Math.floor(Math.random()*array.length);
  return array[index];
};

/* 显示控件 */
class ShowMain extends React.Component{
    smoothRandom = {
        smoothTime:1,
    };
    intervalToggle = null;
    runState = "stop";
    constructor(props){
        super(props);
        this.state = {
            showData:"中午吃什么呢?",
            overStyle:null
        };
    };
    changeShow(){
        this.runState = "random";
        this.intervalToggle = setInterval(() => {
           this.setState({showData:randomArray(FOODARRAY),overStyle:null});
        },INTERVALTIME);
    };
    smoothShow(styleObj = {},time = 3){
        let smoothR = this.smoothRandom;
        if(smoothR.smoothTime <= time) {
            smoothR.smoothTime++;
            setTimeout(() => {
                this.setState({showData: randomArray(FOODARRAY)});
            }, (INTERVALTIME + 50) * smoothR.smoothTime);
        }else{
            smoothR.smoothTime = 0;
            this.runState = "stop";
            this.setState({overStyle:styleObj});
        }
    }
    componentDidUpdate(){
        switch(this.runState) {
            //停滞状态
            case "stop":
                if(this.props.showToggle)
                    this.changeShow();
                break;
            //随机状态
            case "random":
                if(!this.props.showToggle) {
                    this.runState = "smooth";
                    clearInterval(this.intervalToggle);
                }else
                    break;
            //缓慢结束状态
            case "smooth":
                let tmpOverStyle = {
                    "fontWeight":800,
                    "color":'rgb(89, 149, 206)'
                };
                this.smoothShow(tmpOverStyle,3);
                break;
        }
    }
    render(){
        return (
            <div className="info-show-div" style={this.state.overStyle}>
                <div className="info-show-div-cover"></div>
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
