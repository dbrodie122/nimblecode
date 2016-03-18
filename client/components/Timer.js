import React, { Component } from 'react';
import CountdownTimer from './CountdownTimer';
import StartButton from './StartButton';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenthSeconds: 0,
      seconds: 0,
      minutes: 0,
      message: 'Click the start button to begin!',
      countingDown: false,
      showButton: true
    }
  };

  componentDidMount() {

  };

  startCountdown() {
    this.setState({
      countingDown: true,
      showButton: false
    });

    //TODO: when start countdown is called, other sockets should start game too
    if (!this.props.multiGameStarted) {
      this.props.socket.emit('game start', true);
    }
  }

  startMultiCountdown() {
    if (!this.state.countingDown) {
      console.log('inside timer.js, called startMultiCountdown()');
      this.setState({
        countingDown: true,
        showButton: false
      });
    }
  }

  startTimer() {
    this.setState({
      countingDown: false,
      showButton: true,
      message: '0.0'
    });

    this.props.gameStart();

    this.intervalID = setInterval(function() {
      var tenthSeconds = this.state.tenthSeconds + 1;
      var seconds = this.state.seconds;
      var minutes = this.state.minutes;

      if (tenthSeconds > 9) {
        seconds++;
        tenthSeconds = 0;
      }

      if (seconds > 59) {
        minutes++;
        seconds = 0;
      }

      this.setState({
        tenthSeconds : tenthSeconds,
        seconds : seconds,
        minutes: minutes,
        message: this.state.minutes + ':' + this.state.seconds + '.' + this.state.tenthSeconds
      });
    }.bind(this), 100);
  } 

  componentDidUpdate() {
    if (this.props.gameFinished) {
      clearInterval(this.intervalID);
    }

  }

  componentWillReceiveProps() {
    
    // TODO: need to fix this infinite loop!
    // if(this.props.multiGameStarted) {
    //   console.log('inside timer componentDidMount', this.props.multiGameStarted);
    //   this.startMultiCountdown();
    // }
    // this.props.multiGameStarted = false;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2 className="text-center">{this.state.message}</h2>
        </div>
        <StartButton
          showButton={this.state.showButton}
          startCountdown={this.startCountdown.bind(this)}
          startMultiCountdown={this.startMultiCountdown.bind(this)}
          multiGameStarted={this.props.multiGameStarted} />
        <CountdownTimer
          countingDown={this.state.countingDown}
          onCountdownFinish={this.startTimer.bind(this)} />
      </div>
    );
  }
};

export default Timer;