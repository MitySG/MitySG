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
import StepButtons from './StepButtonsContainer';

class VerticalLinearStepper extends React.Component {
  state = {
    stepIndex: 0,
    selectedBus: undefined,
    selectedStart: {},
    selectedEnd: {},
  };

  onNext() {
    this.setState({ stepIndex: this.state.stepIndex + 1 });
  }

  onPrev() {
    this.setState({ stepIndex: this.state.stepIndex - 1 });
  }

  getBusStopCode(routes, text) {
    return routes.find(code =>
      this.props.busStops[code].description.toLowerCase() === text.toLowerCase().trim());
  }

  getTrip() {
    return {
      bus: this.state.selectedBus,
      start: this.state.selectedStart.value,
      end: this.state.selectedEnd.value,
      timeBeforeArrivalToNotify: this.props.notificationValue,
    };
  }

  render() {
    const { stepIndex } = this.state;
    const busStopOptions = (this.props.buses[this.state.selectedBus] || []).map(code => ({
      text: (this.props.busStops[code] || {}).description,
      value: code,
    }));
    const routes = this.props.buses[this.state.selectedBus];
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
                onUpdateInput={selectedBus => this.setState({
                  selectedBus,
                  selectedStart: {},
                  selectedEnd: {},
                })}
                searchText={this.state.selectedBus}
              />
              <StepButtons
                nextDisabled={routes === undefined}
                onNext={() => this.onNext()}
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
                onUpdateInput={(text) => {
                  this.setState({
                    selectedStart: {
                      text,
                      value: this.getBusStopCode(routes, text),
                    },
                    selectedEnd: {},
                  });
                }}
                searchText={this.state.selectedStart.text}
              />
              <StepButtons
                nextDisabled={this.state.selectedStart.value === undefined}
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
                dataSource={
                  busStopOptions.filter(option => option.value !== this.state.selectedStart.value)
                }
                floatingLabelText="Destination stop"
                hintText="Enter bus stop"
                onUpdateInput={(text) => {
                  this.setState({
                    selectedEnd: {
                      text,
                      value: this.getBusStopCode(routes, text),
                    },
                  });
                }}
                searchText={this.state.selectedEnd.text}
              />
              <StepButtons
                nextDisabled={this.state.selectedEnd.value === undefined}
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
                labelStyle={{ fontSize: '10px' }}
                onClick={() => {
                  this.props.addToFavourites(this.getTrip());
                  this.props.setSlideIndex(2);
                }}
              />
              <StepButtons
                isLast
                onNext={() => {
                  this.props.setSlideIndex(1);
                  this.props.setCurrentTrip(this.getTrip());
                }}
                onPrev={() => this.onPrev()}
                stepIndex={this.state.stepIndex}
              />
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default VerticalLinearStepper;
