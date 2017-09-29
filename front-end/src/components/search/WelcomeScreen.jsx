import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
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
      <div>
        <div styleName="image" />
        <div styleName="title">Am I There Yet?</div>
        <div styleName="underscore">__________</div>


        <Paper styleName="paper" zDepth={3}>
          <div styleName="steps">
            {
              ['Choose transit mode', 'Select start and destination', 'Sit back and enjoy'].map((text, index) => (
                <StepLabel
                  key={text}
                  style={{ height: '30px' }}
                  icon={index + 1}
                  active
                >
                  {text}
                </StepLabel>
              ))}
          </div>
          <RaisedButton primary label="BEGIN YOUR JOURNEY" onClick={this.props.onBeginJourney} />
          <div styleName="bottomText">
            <div>Enjoy your worry-free ride.</div>
            <div>{"From start to end, we'll keep you notified"}</div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default WelcomeScreen;
