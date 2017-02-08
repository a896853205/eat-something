require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
/*食物随机数组*/
const FOODARRAY = ["腊汁肉拌饭","淮南牛肉汤饭","老林子鸡鸡腿","砂锅扯面","周记盒饭","旋转小火锅","黄焖鸡米饭","夏小面","玛咖鸡黄饭","郎朗水饺"];
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
        let time = new Date();
        let hour = time.getHours();
        let showMain = "";
        if(hour >= 0 && hour <= 4){
            showMain = "熬夜吃点什么呢?";
        }else if(hour > 4 && hour <= 9){
            showMain = "早上吃点什么呢?";
        }else if(hour > 9 && hour <= 13){
            showMain = "中午吃点什么呢?";
        }else if(hour > 13 && hour <= 21){
            showMain = "下午吃点什么呢?";
        }else if(hour > 21 && hour <= 24){
            showMain = "夜宵吃点什么呢?";
        }
        this.state = {
            showData:showMain,
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
    };
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
    };
    render(){
        return (
            <div className="info-show-div" style={this.state.overStyle}>
                <div className="info-show-div-cover"></div>
                {this.state.showData}
            </div>
      );
    };
}

/* 中间控件 */
class RandomMain extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showToggle:false,
            buttonContext:"看看吃啥"
        };
    };
    showInfo(){
        this.props.backControl();
        let tmpButtonContext = "停!";
        if(this.state.buttonContext === "停!"){
            tmpButtonContext = "不满意再来一次";
        }
        this.setState({showToggle:!this.state.showToggle,buttonContext:tmpButtonContext});
    };
    render() {
        return (
            <div className="info-main-div">
                <ShowMain className="info-show-div" showToggle={this.state.showToggle} />
                <button className="info-control-button" onClick={this.showInfo.bind(this)}>{this.state.buttonContext}</button>
            </div>
        );
    };
}

/* 背景详细控件 */
class BackDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            x: randomIntNum(WINWIDH),
            y: randomIntNum(WINHEIGHT),
            context:randomArray(FOODARRAY),
            delay:randomNum(1)
        };
    };
    judgeOut(dom = null){
        return parseInt($(dom).css("width")) + parseInt($(dom).css("left")) > WINWIDH || parseInt($(dom).css("height")) + parseInt($(dom).css("top")) > WINHEIGHT ?  true :  false;
    };
    build() {
        let detail = ReactDOM.findDOMNode(this);
        console.log(this.props.flag);
        //判断是否超出
        if (this.props.flag) {
            if (this.judgeOut(detail)) {
                    this.setState({
                        x: randomIntNum(WINWIDH),
                        y: randomIntNum(WINHEIGHT),
                        context: randomArray(FOODARRAY),
                    });
            } else
                setTimeout(() => {
                    $(detail).animate({"opacity": "1"}, 600, () => {
                        $(detail).animate({"opacity": "0"}, 600, () => {
                            this.setState({
                                x: randomIntNum(WINWIDH),
                                y: randomIntNum(WINHEIGHT),
                                context: randomArray(FOODARRAY),
                            });
                        });
                    });
                },this.state.delay * 1000);
        }
    };
    render(){
        return (
            <div className="back-detail" style={{left:this.state.x,top:this.state.y}}>
                {this.state.context}
            </div>
        );
    };
    componentDidUpdate(){
        this.build();
    };
}

/* 背景控件 */
class BackGround extends React.Component{
    constructor(props){
        super(props);
    };
    flag:false;
    runState = 'stop';
    render(){
        return (
            <div className="background-div">
                <BackDetail flag={this.flag}/>
                <BackDetail flag={this.flag}/>
                <BackDetail flag={this.flag}/>
                <BackDetail flag={this.flag}/>
                <BackDetail flag={this.flag}/>
                <BackDetail flag={this.flag}/>
                <BackDetail flag={this.flag}/>
                <BackDetail flag={this.flag}/>
                <BackDetail flag={this.flag}/>
            </div>
        );
    };
    componentDidUpdate(){
        switch(this.runState){
            case 'stop':
                if(this.props.backToggle){
                    //开始渲染详细控件
                    this.flag = true;
                    this.runState = 'run';
                    this.setState({});
                }
                break;
            case 'run':
                if(!this.props.backToggle){
                    this.flag = false;
                    this.runState = 'stop';
                    this.setState({});
                }
        }
    };
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
