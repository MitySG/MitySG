import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './StepButtons.css';

const StepButtons = ({ stepIndex, onNext, onPrev, nextDisabled }) => (
  <div styleName={stepIndex === 3 ? '' : 'nextAndBackButtons'}>
    <RaisedButton
      label={stepIndex === 3 ? 'Begin Journey' : 'Next'}
      disableTouchRipple
      disableFocusRipple
      primary
      disabled={nextDisabled}
      onClick={() => {
        if (stepIndex === 3) {
          this.props.setSlideIndex(1);
          this.props.setCurrentTrip({
            bus: this.state.selectedBus,
            start: this.state.selectedStart,
            end: this.state.selectedEnd,
          });
        } else {
          onNext();
        }
      }}
      styleName="nextButton"
    />
    {stepIndex > 0 && (
      <FlatButton
        label="Back"
        disableTouchRipple
        disableFocusRipple
        onClick={onPrev}
      />
    )}
  </div>
);

export default StepButtons;
