import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import Slider from './Slider';
import AutoComplete from './AutoComplete';
import './Home.css';
import StepButtons from './StepButtonsContainer';
import Snackbar from './Snackbar';
import { setContentVh } from '../calcVH';

const emptyLabel = { label: '' };
class Home extends React.Component {
  state = {
    stepIndex: 0,
    selectedBus: emptyLabel,
    selectedStart: emptyLabel,
    selectedEnd: emptyLabel,
    isBus: true,
    snackbarMessage: '',
    stopOptions: [],
  };

  componentDidMount() {
    setContentVh(this.ref);
    window.ga('set', 'page', '/Home');
    window.ga('send', 'pageview');
  }

  onNext() {
    this.setState({ stepIndex: this.state.stepIndex + 1 });
  }

  onPrev() {
    this.setState({ stepIndex: this.state.stepIndex - 1 });
  }

  getCode(text) {
    return (this.state.stopOptions.find(stop =>
      stop.text.toLowerCase() === text.toLowerCase().trim()) || {}).code;
  }

  getTrip() {
    return {
      bus: this.state.isBus ? this.state.selectedBus.value : undefined,
      start: this.state.selectedStart.value,
      end: this.state.selectedEnd.value,
      timeBeforeArrivalToNotify: this.props.notificationValue,
    };
  }

  goToSelectStart() {
    let stopOptions;
    if (this.state.isBus) {
      this.routes = this.props.buses[this.state.selectedBus.value] || [];
      const combinedRoutes = this.routes.reduce((a, b) => a.concat(b), []);
      stopOptions = this.mapToBusOptions([...new Set(combinedRoutes)]);
    } else {
      stopOptions = Object.keys(this.props.trainStations).map(station => ({
        text: station,
        value: station,
        code: station,
      }));
    }
    this.setState({
      stopOptions,
    });
  }

  goToSelectEnd() {
    const selectedStart = this.state.selectedStart;
    const routes = this.routes;
    let stopOptions;
    if (this.state.isBus) {
      const findIndex = route => route.findIndex(code => code === selectedStart.value);
      const firstRouteIndex = findIndex(routes[0]);
      if (routes.length === 1) {
        stopOptions = routes[0].slice(firstRouteIndex);
      } else if (routes.length > 1) {
        const secondRouteIndex = findIndex(routes[1]);
        stopOptions = [
          ...(firstRouteIndex === -1 ? [] : routes[0].slice(firstRouteIndex)),
          ...(secondRouteIndex === -1 ? [] : routes[1].slice(secondRouteIndex)),
        ];
      }
      stopOptions = stopOptions.filter(option => option !== selectedStart.value);
      stopOptions = this.mapToBusOptions(stopOptions);
    } else {
      stopOptions = this.state.stopOptions.filter(option => option.code !==
        selectedStart.value);
    }

    this.setState({
      stopOptions,
    });
  }

  mapToBusOptions(routes) {
    return routes.map((code) => {
      const description = (this.props.busStops[code] || {}).description || '';
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
  }

  render() {
    const { isBus, selectedBus, selectedStart, selectedEnd } = this.state;
    const { buses, trainStations } = this.props;

    return (
      <div ref={(ref) => { this.ref = ref; }} styleName="container">
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
                  nextDisabled={this.state.isBus && !this.state.selectedBus.value}
                  onNext={() => {
                    this.onNext();
                    this.goToSelectStart();
                  }}
                />
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Select start</StepLabel>
              <StepContent>
                <AutoComplete
                  dataSource={this.state.stopOptions}
                  hintText={isBus ? 'Enter Bus Stop' : 'Enter Train Station'}
                  searchText={selectedStart.label}
                  onUpdateInput={(newValue) => {
                    this.setState({
                      selectedStart: {
                        label: newValue,
                        value: this.getCode(newValue),
                      },
                      selectedEnd: emptyLabel,
                    });
                  }}
                />
                <StepButtons
                  nextDisabled={!selectedStart.value}
                  onNext={() => {
                    this.onNext();
                    this.goToSelectEnd();
                  }}
                  onPrev={() => this.onPrev()}
                />
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Select destination</StepLabel>
              <StepContent>
                <AutoComplete
                  dataSource={this.state.stopOptions}
                  hintText={isBus ? 'Enter Bus Stop' : 'Enter Train Station'}
                  searchText={selectedEnd.label}
                  onUpdateInput={(newValue) => {
                    this.setState({
                      selectedEnd: {
                        label: newValue,
                        value: this.getCode(newValue),
                      },
                    });
                  }}
                />
                <StepButtons
                  nextDisabled={!selectedEnd.value}
                  onNext={() => this.onNext()}
                  onPrev={() => {
                    this.onPrev();
                    this.goToSelectStart();
                  }}
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
                    const snackbarMessage = isInputChecked ? 'Added to favourites' : 'Removed from favourites';
                    this.setState({ snackbarMessage });
                  }}
                />
                <Snackbar
                  message={this.state.snackbarMessage}
                  onRequestClose={() => this.setState({ snackbarMessage: '' })}
                />
                <div styleName="warning">Be at your start point before starting!</div>
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
      </div>
    );
  }
}

export default Home;
