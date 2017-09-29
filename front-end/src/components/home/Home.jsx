import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import Slider from './Slider';
import AutoComplete from './AutoComplete';
import './Home.css';
import StepButtons from './StepButtonsContainer';

const emptyLabel = { label: '' };
class VerticalLinearStepper extends React.Component {
  constructor(props) {
    super(props);
    window.ga('set', 'page', '/Home');
  }

  state = {
    stepIndex: 0,
    selectedBus: emptyLabel,
    selectedStart: emptyLabel,
    selectedEnd: emptyLabel,
    isBus: true,
    isSnackOpen: false,
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
      ? (buses[selectedBus.value] || []).map(code => (busStops[code] || {}).description || '')
      : Object.keys(trainStations);
    const stops = isBus ? buses[selectedBus.value] : stopOptions;
    return (
      <Paper styleName="paper" zDepth={3}>
        <Stepper activeStep={this.state.stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Choose your transit</StepLabel>
            <StepContent>
              <RadioButtonGroup
                name="BusOrMRT"
                defaultSelected="Bus"
                onChange={(e, value) => {
                  this.setState({ isBus: value === 'Bus' });
                }}
              >
                <RadioButton
                  value="Bus"
                  label="Bus"
                />
                <RadioButton
                  value="MRT"
                  label="MRT"
                />
              </RadioButtonGroup>
              { isBus &&
                <AutoComplete
                  dataSource={Object.keys(buses)}
                  hintText="Enter Bus Service Number"
                  searchText={selectedBus.label}
                  onUpdateInput={(newValue) => {
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
            <StepLabel>Select start</StepLabel>
            <StepContent>
              <AutoComplete
                dataSource={stopOptions}
                hintText={isBus ? 'Enter Bus Stop' : 'Enter Train Station'}
                searchText={this.state.selectedStart.label}
                onUpdateInput={(newValue) => {
                  this.setState({
                    selectedStart: {
                      label: newValue,
                      value: this.getCode(stops, newValue),
                    },
                    selectedEnd: emptyLabel,
                  });
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
                dataSource={stopOptions.filter(option => option.toLowerCase() !==
                  this.state.selectedStart.label.toLowerCase())}
                hintText={isBus ? 'Enter Bus Stop' : 'Enter Train Station'}
                searchText={this.state.selectedEnd.label}
                onUpdateInput={(newValue) => {
                  this.setState({
                    selectedEnd: {
                      label: newValue,
                      value: this.getCode(stops, newValue),
                    },
                  });
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
              <Checkbox
                label="Add to favourites"
                styleName="favourite"
                onCheck={(e, isInputChecked) => {
                  if (isInputChecked) {
                    this.props.addToFavourites(this.getTrip());
                  } else {
                    this.props.removeFromFavourites(JSON.stringify(this.getTrip()));
                  }
                  this.message = isInputChecked ? 'Added to favourites' : 'Removed from favourites';
                  this.setState({ isSnackOpen: true });
                }}
              />
              <Snackbar
                contentStyle={{ textAlign: 'center' }}
                open={this.state.isSnackOpen}
                message={this.message || ''}
                autoHideDuration={3000}
                onRequestClose={() => this.setState({ isSnackOpen: false })}
              />
              <StepButtons
                label="Start"
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
