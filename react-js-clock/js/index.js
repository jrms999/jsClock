"use strict";

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
/* Clock cell */
var ClockCell = React.createClass({
  displayName: "ClockCell",

  getInitialState: function getInitialState() {
    return {
      animated: false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var animationState = this.props.timeValue !== nextProps.timeValue ? true : false;
    this.setState({
      animated: animationState
    });
  },

  render: function render() {
    var className = "clock-cell ";
    className += this.state.animated ? "flip" : "";
    return React.createElement(
      "div",
      { className: className },
      " ",
      this.props.timeValue,
      " "
    );
  }
});

/* CLOCK component  */
var Clock = React.createClass({
  displayName: "Clock",

  getInitialState: function getInitialState() {
    var newDate = new Date(),
        currentTime = newDate.toLocaleTimeString().split(/:| /);
    return this.getTime(currentTime);
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    this.timerID = setInterval(function () {
      return _this.tick();
    }, 1000);
  },

  componentWillUnmount: function componentWillUnmount() {
    clearInterval(this.timerID);
  },

  getTime: function getTime(time) {
    return {
      hour: time[0].length === 1 ? "0" + time[0] : time[0],
      minutes: time[1],
      seconds: time[2],
      period: time[3]
    };
  },

  tick: function tick() {
    var newDate = new Date(),
        currentTime = newDate.toLocaleTimeString().split(/:| /);
    this.setState(this.getTime(currentTime));
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "clock" },
      React.createElement(ClockCell, { timeValue: this.state.hour[0] }),
      React.createElement(ClockCell, { timeValue: this.state.hour[1] }),
      React.createElement(ClockCell, { timeValue: this.state.minutes[0] }),
      React.createElement(ClockCell, { timeValue: this.state.minutes[1] }),
      React.createElement(ClockCell, { timeValue: this.state.seconds[0] }),
      React.createElement(ClockCell, { timeValue: this.state.seconds[1] }),
      React.createElement(ClockCell, { timeValue: this.state.period })
    );
  }
});

/* RENDER the DOM*/
ReactDOM.render(React.createElement(Clock, null), document.getElementById('mainContainer'));