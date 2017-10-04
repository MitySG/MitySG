import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import MenuItem from 'material-ui/MenuItem';
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
  static getCode(stopOptions, text) {
    return (stopOptions.find(stop =>
      stop.text.toLowerCase() === text.toLowerCase().trim()) || {}).code;
  }

  state = {
    stepIndex: 0,
    selectedBus: emptyLabel,
    selectedStart: emptyLabel,
    selectedEnd: emptyLabel,
    isBus: true,
    isSnackOpen: false,
  };

  componentDidMount() {
    window.ga('set', 'page', '/Home');
  }

  onNext() {
    this.setState({ stepIndex: this.state.stepIndex + 1 });
  }

  onPrev() {
    this.setState({ stepIndex: this.state.stepIndex - 1 });
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

    let stopOptions;
    let routes;
    if (isBus) {
      routes = buses[selectedBus.value] || [];
      stopOptions = routes.reduce((a, b) => a.concat(b), []).map((code) => {
        const description = (busStops[code] || {}).description || '';
        const maxLen = 20;
        const descriptionTruncated = description.length > maxLen
          ? `${description.slice(0, maxLen - 3)}...` : description;
        return {
          code,
          text: `${description} ${code}`,
          value: <MenuItem
            primaryText={descriptionTruncated}
            secondaryText={code}
          />,
        };
      });
    } else {
      stopOptions = Object.keys(trainStations).map(station => ({
        text: station,
        value: station,
        code: station,
      }));
    }
    return (
      <Paper styleName="paper" zDepth={3}>
        <Stepper activeStep={this.state.stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Choose your transit mode</StepLabel>
            <StepContent>
              <RadioButtonGroup
                name="BusOrMRT"
                defaultSelected={isBus ? 'Bus' : 'MRT'}
                onChange={(e, value) => {
                  this.setState({
                    isBus: value === 'Bus',
                    selectedStart: emptyLabel,
                    selectedEnd: emptyLabel,
                  });
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
                nextDisabled={stopOptions.length === 0}
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
                      value: Home.getCode(stopOptions, newValue),
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
                dataSource={stopOptions.filter(option => option.text.toLowerCase() !==
                  this.state.selectedStart.label.toLowerCase())}
                hintText={isBus ? 'Enter Bus Stop' : 'Enter Train Station'}
                searchText={this.state.selectedEnd.label}
                onUpdateInput={(newValue) => {
                  this.setState({
                    selectedEnd: {
                      label: newValue,
                      value: Home.getCode(stopOptions, newValue),
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
