require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
/*食物随机数组*/
const FOODARRAY = ["腊汁肉拌饭","淮南牛肉汤饭","老林子鸡鸡腿"];
const INTERVALTIME = 100;                      //间隔时间
const WINWIDH = document.body.clientWidth;     //屏幕宽度
const WINHEIGHT = document.body.clientHeight;  //屏幕高度
/* 随机数组函数*/
let randomArray = array => {
  let index = Math.floor(Math.random()*array.length);
  return array[index];
};
/* 随机取数 */
let randomNum = top =>{
    return Math.random()*top;
}
let randomIntNum = top=>{
    return Math.floor(Math.random()*top);
}
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
        this.props.backControl();
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

/* 背景详细控件 */
class BackDetail extends React.Component{
    render(){
        return (
            <div className="back-detail" style={{left:this.props.pos.x,top:this.props.pos.y}}>
                {this.props.context}
            </div>
        );
    }
}

/* 背景控件 */
class BackGround extends React.Component{
    constructor(props){
        super(props);
        /*this.state = {
            backToggle:false
        };*/
    };
    runState = 'stop';
    details = [];
    render(){
        return (
            <div className="background-div">
                {this.details}
            </div>
        );
    };
    componentDidUpdate(){
        switch(this.runState){
            case 'stop':
                if(this.props.backToggle){
                    //开始渲染详细控件

                    this.runState = 'run';
                }
            case 'run':
                if(!this.props.backToggle){
                    this.runState = 'stop';
                }
        }
    }
}

/* 主舞台控件 */
class AppComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            backToggle:false
        };
    };
    backToggleFuc(){
        this.setState({backToggle:!this.state.backToggle});
    };
    render() {
        return (
            <div className="index">
                <BackGround backToggle={this.state.backToggle}/>
                <RandomMain backControl={this.backToggleFuc.bind(this)}/>
            </div>
        );
    };
}

export default AppComponent;
