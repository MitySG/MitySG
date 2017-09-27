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

class VerticalLinearStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 3,
    selectedBus: null,
    selectedStart: null,
    selectedEnd: null,
    timeTillArrival: 'Start',
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
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
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label={stepIndex === 3 ? 'Begin' : 'Next'}
          disableTouchRipple
          disableFocusRipple
          primary
          onClick={this.handleNext}
          style={{ marginRight: 12 }}
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
    const { finished, stepIndex } = this.state;

    const busStopOptions = (this.props.buses[this.state.selectedBus] || []).map(code =>
      this.props.busStops[code].description,
    );

    return (
      <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
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
                step={1}
                min={1}
                max={10}
                value={this.props.notificationValue}
                onChange={(e, value) => this.props.setNotificationValue(value)}
              />
              {this.renderStepActions(3)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{ margin: '20px 0', textAlign: 'center' }}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({ stepIndex: 0, finished: false });
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        )}
      </div>
    );
  }
}

export default VerticalLinearStepper;
