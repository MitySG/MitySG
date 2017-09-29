import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { StepLabel } from 'material-ui/Stepper';
import './WelcomeScreen.css';
import Logo from '../../images/logo.png';

class WelcomeScreen extends React.Component {
  static childContextTypes = { stepper: PropTypes.object };
  getChildContext() {
    const { orientation } = 'vertical';
    return { stepper: { orientation } };
  }
  render() {
    return (
      <div styleName="container">
        <div styleName="image" />
        <Paper styleName="home" zDepth={3}>
          {
            ['Choose transit mode', 'Select start and destination', 'Sit back and enjoy'].map((text, index) => (
              <StepLabel
                style={{ height: '30px' }}
                icon={index + 1}
                active
              >
                {text}
              </StepLabel>
            ))}
        </Paper>
      </div>
    );
  }
}

export default WelcomeScreen;
