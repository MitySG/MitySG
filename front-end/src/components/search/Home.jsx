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

  onNext() {
    this.setState({ stepIndex: this.state.stepIndex + 1 });
  }

  onPrev() {
    this.setState({ stepIndex: this.state.stepIndex - 1 });
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
                searchText={this.state.selectedBus}
                onNext={() => this.onNext()}
                onPrev={() => this.onPrev()}
                stepIndex={this.state.stepIndex}
              />
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
                searchText={this.state.selectedStart}
                onNext={() => this.onNext()}
                onPrev={() => this.onPrev()}
                stepIndex={this.state.stepIndex}
              />
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
                searchText={this.state.selectedEnd}
                onNext={() => this.onNext()}
                onPrev={() => this.onPrev()}
                stepIndex={this.state.stepIndex}
              />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Notification options</StepLabel>
            <StepContent>
              <Slider
                value={this.props.notificationValue}
                onChange={(e, value) => this.props.setNotificationValue(value)}
              />
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
