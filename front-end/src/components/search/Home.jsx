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
    isBus: true,
  };

  onNext() {
    this.setState({ stepIndex: this.state.stepIndex + 1 });
  }

  onPrev() {
    this.setState({ stepIndex: this.state.stepIndex - 1 });
  }

  getCode(stops, text) {
    return stops.find(stop =>
      (this.state.isBus ? this.props.busStops[stop].description : stop).toLowerCase() ===
      text.toLowerCase().trim());
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
    const { isBus, selectedBus } = this.state;
    const { buses, busStops, trainStations } = this.props;

    const stopOptions = isBus ? (buses[selectedBus] || []).map(code => ({
      text: (busStops[code] || {}).description,
      value: code,
    })) : Object.keys(trainStations);
    const stops = isBus ? buses[selectedBus] : stopOptions;
    return (
      <div styleName="home">
        <Stepper activeStep={this.state.stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Choose your transit</StepLabel>
            <StepContent>
              <input
                type="radio"
                id="bus"
                checked={isBus}
                onChange={() => this.setState({ isBus: true })}
              />
              <label htmlFor="bus">Bus</label>

              <input
                type="radio"
                id="mrt"
                checked={!isBus}
                onChange={() => this.setState({ isBus: false })}
              />
              <label htmlFor="mrt">MRT</label>
              { isBus &&
                <AutoComplete
                  dataSource={Object.keys(buses)}
                  floatingLabelText="Bus Service Number"
                  hintText="Enter bus number"
                  onUpdateInput={text => this.setState({
                    selectedBus: text,
                    selectedStart: {},
                    selectedEnd: {},
                  })}
                  searchText={selectedBus}
                />
              }
              <StepButtons
                nextDisabled={stops === undefined}
                onNext={() => this.onNext()}
              />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Select starting stop</StepLabel>
            <StepContent>
              <AutoComplete
                dataSource={stopOptions}
                floatingLabelText={isBus ? 'Starting bus stop' : 'Starting train station'}
                hintText={isBus ? 'Enter bus stop' : 'Enter train station'}
                onUpdateInput={(text) => {
                  this.setState({
                    selectedStart: {
                      text,
                      value: this.getCode(stops, text),
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
              />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Select destination</StepLabel>
            <StepContent>
              <AutoComplete
                dataSource={stopOptions.filter(option =>
                  (isBus ? option.value : option) !== this.state.selectedStart.value)
                }
                floatingLabelText="Destination stop"
                hintText="Enter bus stop"
                onUpdateInput={(text) => {
                  this.setState({
                    selectedEnd: {
                      text,
                      value: this.getCode(stops, text),
                    },
                  });
                }}
                searchText={this.state.selectedEnd.text}
              />
              <StepButtons
                nextDisabled={this.state.selectedEnd.value === undefined}
                onNext={() => this.onNext()}
                onPrev={() => this.onPrev()}
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
              />
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default VerticalLinearStepper;
