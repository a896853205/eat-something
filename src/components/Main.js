require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

class RandomMain extends React.Component {
  render() {
    return (
      <div className="info-main-div">
        <div className="info-show-div">{this.props.showInfo}</div>
        <button className="info-control-button">看看吃啥</button>
      </div>
    );
  }
}

class AppComponent extends React.Component {
  state = {showFood:"中午吃什么?"};
  render() {
    return (
      <div className="index">
        <RandomMain showInfo={this.state.showFood}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
  foodArray:["腊汁肉拌饭","淮南牛肉汤饭","老林子鸡鸡腿"],
};

/*AppComponent.getInitialState = {
  showFood:"中午吃什么呢?"
};*/
export default AppComponent;
