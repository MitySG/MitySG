import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './StepButtons.css';

const StepButtons = props => (
  <div>
    <RaisedButton
      label={props.label || 'Next'}
      disableTouchRipple
      disableFocusRipple
      primary
      disabled={props.nextDisabled}
      onClick={props.onNext}
      styleName="nextButton"
    />
    {props.onPrev && (
      <FlatButton
        label="Back"
        disableTouchRipple
        disableFocusRipple
        onClick={props.onPrev}
      />
    )}
  </div>
);

export default StepButtons;
