import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Slider from './Slider';
import AutoComplete from './AutoComplete';
import './Home.css';
import StepButtons from './StepButtonsContainer';

const emptyLabel = { label: '' };
class VerticalLinearStepper extends React.Component {
  state = {
    stepIndex: 0,
    selectedBus: emptyLabel,
    selectedStart: emptyLabel,
    selectedEnd: emptyLabel,
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
      bus: this.state.isBus ? this.state.selectedBus.value : undefined,
      start: this.state.selectedStart.value,
      end: this.state.selectedEnd.value,
      timeBeforeArrivalToNotify: this.props.notificationValue,
    };
  }

  render() {
    const { isBus, selectedBus } = this.state;
    const { buses, busStops, trainStations } = this.props;

    const stopOptions = isBus
      ? (buses[selectedBus.value] || []).map(code => (busStops[code] || {}).description)
      : Object.keys(trainStations);
    const stops = isBus ? buses[selectedBus.value] : stopOptions;
    return (
      <Paper styleName="home" zDepth={3}>
        <Stepper activeStep={this.state.stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Choose your transit</StepLabel>
            <StepContent>
              <div styleName="radioGroup">
                <input
                  type="radio"
                  id="bus"
                  styleName="radio"
                  checked={isBus}
                  onChange={() => this.setState({ isBus: true })}
                />
                <label styleName="label" htmlFor="bus">Bus</label>
              </div>

              <div styleName="radio">
                <input
                  type="radio"
                  id="mrt"
                  styleName="radio"
                  checked={!isBus}
                  onChange={() => this.setState({ isBus: false })}
                />
                <label styleName="label" htmlFor="mrt">MRT</label>
              </div>
              { isBus &&
                <AutoComplete
                  data={Object.keys(buses)}
                  inputProps={{
                    placeholder: 'Enter bus number',
                    value: selectedBus.label,
                    onChange: (e, { newValue }) => {
                      // somewhat hackish, but works
                      // since there's at most one letter in bus service number
                      let value;
                      if (buses[newValue.toLowerCase()]) {
                        value = newValue.toLowerCase();
                      } else if (buses[newValue.toUpperCase()]) {
                        value = newValue.toUpperCase();
                      }
                      this.setState({
                        selectedBus: {
                          label: newValue,
                          value,
                        },
                        selectedStart: emptyLabel,
                        selectedEnd: emptyLabel,
                      });
                    },
                  }}
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
                data={stopOptions}
                inputProps={{
                  placeholder: isBus ? 'Enter bus stop' : 'Enter train station',
                  value: this.state.selectedStart.label,
                  onChange: (e, { newValue }) => {
                    this.setState({
                      selectedStart: {
                        label: newValue,
                        value: this.getCode(stops, newValue),
                      },
                      selectedEnd: emptyLabel,
                    });
                  },
                }}
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
                data={stopOptions.filter(option => option.toLowerCase() !==
                  this.state.selectedStart.label.toLowerCase())}
                inputProps={{
                  placeholder: isBus ? 'Enter bus stop' : 'Enter train station',
                  value: this.state.selectedEnd.label,
                  onChange: (e, { newValue }) => {
                    this.setState({
                      selectedEnd: {
                        label: newValue,
                        value: this.getCode(stops, newValue),
                      },
                    });
                  },
                }}
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
                  this.props.setCurrentTrip(this.getTrip(), trainStations);
                }}
                onPrev={() => this.onPrev()}
              />
            </StepContent>
          </Step>
        </Stepper>
      </Paper>
    );
  }
}

export default VerticalLinearStepper;
