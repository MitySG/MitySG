import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Slider from './Slider';
import AutoComplete from './AutoComplete';
import './Home.css';

class VerticalLinearStepper extends React.Component {

  state = {
    stepIndex: 0,
    selectedBus: null,
    selectedStart: null,
    selectedEnd: null,
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <div styleName={stepIndex === 3 ? '' : 'nextAndBackButtons'}>
        <RaisedButton
          label={stepIndex === 3 ? 'Begin Journey' : 'Next'}
          disableTouchRipple
          disableFocusRipple
          primary
          onClick={() => {
            if (stepIndex === 3) {
              this.setState({ timeTillArrival: 'Bus arriving in 5min...' });
              this.props.setSlideIndex(1);
              this.props.setCurrentTrip({
                bus: this.state.selectedBus,
                start: this.state.selectedStart,
                end: this.state.selectedEnd,
              });
            } else {
              this.handleNext();
            }
          }}
          styleName="nextButton"
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple
            disableFocusRipple
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const { stepIndex } = this.state;
    const busStopOptions = (this.props.buses[this.state.selectedBus] || []).map(code => ({
      text: (this.props.busStops[code] || {}).description,
      value: code,
    }));

    return (
      <div styleName="home">
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Choose your transit</StepLabel>
            <StepContent>
              <AutoComplete
                dataSource={Object.keys(this.props.buses)}
                floatingLabelText="Bus Service Number"
                hintText="Enter bus number"
                onUpdateInput={selectedBus => this.setState({ selectedBus })}
              />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Select starting stop</StepLabel>
            <StepContent>
              <AutoComplete
                dataSource={busStopOptions}
                floatingLabelText="Starting bus stop"
                hintText="Enter bus stop"
                onUpdateInput={selectedStart => this.setState({ selectedStart })}
              />
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Select destination</StepLabel>
            <StepContent>
              <AutoComplete
                dataSource={busStopOptions}
                floatingLabelText="Destination stop"
                hintText="Enter bus stop"
                onUpdateInput={selectedEnd => this.setState({ selectedEnd })}
              />
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Notification options</StepLabel>
            <StepContent>
              <Slider
                value={this.props.notificationValue}
                onChange={(e, value) => this.props.setNotificationValue(value)}
              />
              {this.renderStepActions(3)}

              <RaisedButton
                label="Add to favourites"
                onClick={() => this.props.addToFavourites({
                  bus: this.state.selectedBus,
                  start: this.state.selectedStart,
                  end: this.state.selectedEnd,
                })}
              />
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default VerticalLinearStepper;
