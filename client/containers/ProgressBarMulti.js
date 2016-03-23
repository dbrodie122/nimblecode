import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { leavePage } from '../actions/index';
import { bindActionCreators } from 'redux';
import underscore from 'underscore';

class ProgressBarMulti extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playersProgress: {}
    }
  };

  static propTypes = {
    percentComplete: PropTypes.number
  };

  static defaultProps = {
    percentComplete: 0
  };

  componentWillUnmount() {
    this.props.leavePage();
  };

  isCurrentPlayer(player) {
    console.log(typeof player);
    if(player === this.props.socket.id) {
      return '' + player + '(You)';
    } else {
      return player;
    }
  };

  renderBars() {
    return underscore.map(this.props.multiGameProgress.store, function(player, key) {
      return (
        <div className="progress-bar" key={key} >
          <div
            className="progress-fill"
            style={{
              width: player[1] + '%',
              backgroundColor: '#' + player[0],
              color: 'black'
            }}>
          {this.isCurrentPlayer(key)}
          </div> 
        </div>
      );
    }.bind(this));
  }

  render() {
    return (
      <div>
        { this.renderBars() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    multiGameProgress: state.multiGameProgress
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {leavePage: leavePage} , dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBarMulti);