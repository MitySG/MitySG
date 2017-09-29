import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TripInfo from './TripInfo';
import './Journey.css';
import Maps from './Maps';

const distance = (a, b) => {
  // Shamelessly copied from https://stackoverflow.com/a/27943/211319

  const deg2rad = deg => deg * (Math.PI / 180);

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(a.latitude - b.latitude);
  const dLon = deg2rad(a.longitude - b.longitude);
  const x =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(a.latitude)) * Math.cos(deg2rad(b.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  const d = R * c;
  return d;
};

function getNearestStop(coords, stops) {
  return Object.entries(stops).reduce(([currentKey, currentValue], [prevKey, prevValue]) => {
    const distShorter = distance(coords, currentValue) < distance(coords, prevValue);
    return distShorter ? [currentKey, currentValue] : [prevKey, prevValue];
  });
}

class Journey extends React.Component {
  constructor(props) {
    super(props);
    window.ga('set', 'page', '/Journey');

    navigator.geolocation.watchPosition((position) => {
      const coords = position.coords;
      this.props.setCurrentCoords({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      if (this.props.currentTrip && this.props.busStops && this.props.trainStations) {
        const stops = this.props.currentTrip.bus ? this.props.busStops : this.props.trainStations;
        const [key, nearestStop] = getNearestStop(coords, stops);
        this.props.setNearestStop(this.props.currentTrip.bus ? nearestStop.description : key);
        this.getArrivalTime(nearestStop);
      }
    });
  }

  componentDidMount() {
    if (!this.props.currentCoords.latitude && this.props.currentTrip) {
      this.getArrivalTime(this.props.currentTrip.bus
        ? this.props.startStop
        : this.props.trainStations[this.props.startStop]);
    }

    this.checkIfTripExpired();
    window.onfocus = () => {
      this.checkIfTripExpired();
    };
  }

  getArrivalTime(start) {
    if (!this.props.currentTrip || !start) return;
    if (this.props.currentTrip.bus) {
      this.props.getBusArrival(start, this.props.endStop);
    } else {
      this.props.getTrainArrival(start.id, (this.props.trainStations[this.props.endStop] || {}).id);
    }
  }

  checkIfTripExpired() {
    const currentTrip = this.props.currentTrip;
    if (currentTrip && (Date.now() - currentTrip.started > 120 * 60000)) {
      this.props.setCurrentTrip(null);
    }
  }

  renderTrip(start, end) {
    if (this.props.eta === null) {
      return (
        <div>
          Trip is not available
        </div>
      );
    }
    return (
      <div>
        <div styleName="trip">
          <TripInfo
            trip={this.props.currentTrip}
            startStop={start}
            endStop={end}
          />
          <RaisedButton
            secondary
            label="CANCEL TRIP"
            onClick={() => {
              this.props.setCurrentTrip(null);
            }}
          />
        </div>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div>
            <Paper styleName="eta">
            You are near: <span styleName="data">{this.props.nearestStop}</span>
            </Paper>
            <Paper styleName="eta">
            Time till destination: <span styleName="data">{this.props.eta} min</span>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  render() {
    const { currentTrip, startStop, endStop } = this.props;
    let start;
    let end;
    let mrtString;
    if (currentTrip) {
      start = currentTrip.bus ? (startStop || {}).description : startStop;
      end = currentTrip.bus ? (endStop || {}).description : endStop;
      mrtString = currentTrip.bus ? '' : '+MRT+Station';
    }
    return (
      <div>
        <Paper zDepth={3} styleName="paper">
          {currentTrip ? this.renderTrip(start, end) : <div styleName="label">You have not started a journey</div>
          }
        </Paper>
        <Maps
          start={start + mrtString}
          end={end + mrtString}
          currentCoords={!start && this.props.currentCoords}
        />
      </div>
    );
  }
}

export default Journey;
