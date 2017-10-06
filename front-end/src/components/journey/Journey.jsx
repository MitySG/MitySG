import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TripInfo from './TripInfo';
import './Journey.css';
import Maps from './MapsContainer';
import Snackbar from '../home/Snackbar';

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
  const d = R * c * 1000;
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

    navigator.geolocation.watchPosition((position) => {
      const coords = position.coords;
      if (distance(this.props.currentCoords, coords) < 200) {
        return;
      }
      this.props.setCurrentCoords({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      this.getArrivalTimeFromCoords(coords);
    });

    window.onfocus = () => {
      this.isCurrentTripValid();
    };
  }

  state = {
    snackbarMessage: '',
    saveLabel: this.getTripInfo().isFavourite ? 'REMOVE' : 'SAVE',
  };

  componentWillMount() {
    if (this.isCurrentTripValid()) {
      if (this.props.currentCoords.latitude) {
        this.getArrivalTimeFromCoords();
      } else {
        this.getArrivalTime(this.props.currentTrip.bus
          ? this.props.busStops[this.props.currentTrip.start]
          : this.props.trainStations[this.props.start]);
      }
    }
  }

  componentDidMount() {
    window.ga('set', 'page', '/Journey');
    window.ga('send', 'pageview');
  }

  getTripInfo() {
    const currentTrip = this.props.currentTrip;
    if (!currentTrip) return {};
    const trip = {
      bus: currentTrip.bus,
      start: currentTrip.start,
      end: currentTrip.end,
      timeBeforeArrivalToNotify: currentTrip.timeBeforeArrivalToNotify,
    };
    const stringifiedTrip = JSON.stringify(trip);
    const isFavourite = this.props.favourites.some(favourite =>
      JSON.stringify(favourite) === stringifiedTrip);
    return {
      trip,
      stringifiedTrip,
      isFavourite,
    };
  }

  getArrivalTimeFromCoords(coords = this.props.currentCoords) {
    if (this.props.currentTrip && Object.keys(this.props.busStops).length && Object.keys(this.props.trainStations).length) {
      const [busCode, busStop] = getNearestStop(coords, this.props.busStops);
      const [trainName, trainStation] = getNearestStop(coords, this.props.trainStations);
      this.getArrivalTime(this.props.currentTrip.bus ? busStop : trainStation);
    }
  }

  getArrivalTime(start) {
    if (!start || !this.props.currentTrip) {
      return;
    }
    if (this.props.currentTrip.bus) {
      this.props.getBusArrival(start, this.props.busStops[this.props.currentTrip.end]);
    } else {
      this.props.getTrainArrival(start.id,
        (this.props.trainStations[this.props.currentTrip.end] || {}).id);
    }
  }

  isCurrentTripValid() {
    const currentTrip = this.props.currentTrip;
    if (currentTrip) {
      if (Date.now() - currentTrip.started < 120 * 60000) {
        return true;
      }
      this.props.setCurrentTrip(null);
      this.props.setSlideIndex(2);
    }
    return false;
  }

  renderTrip(start, end) {
    const hasEta = this.props.eta < 0 || this.props.eta === undefined || this.props.eta === null;
    const isSave = this.state.saveLabel === 'SAVE';
    return (
      <div>
        <div styleName="trip">
          <div>
            <TripInfo
              trip={this.props.currentTrip}
              startStop={start}
              endStop={end}
            />
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <div>
                <Paper styleName="eta">
                ETA: <span styleName="data">{hasEta ? 'Unknown' : `${this.props.eta} min`}</span>
                </Paper>
              </div>
            </MuiThemeProvider>
          </div>
          <div styleName="buttons">
            <div styleName="image" />
            <RaisedButton
              buttonStyle={{ borderRadius: '20px' }}
              primary={isSave}
              secondary={!isSave}
              label={this.state.saveLabel}
              onClick={() => {
                const { trip, stringifiedTrip, isFavourite } = this.getTripInfo();
                if (isFavourite) {
                  this.setState({
                    snackbarMessage: 'Removed from favourites',
                    saveLabel: 'SAVE',
                  });
                  this.props.removeFromFavourites(stringifiedTrip);
                } else {
                  this.setState({
                    snackbarMessage: 'Added to favourites',
                    saveLabel: 'REMOVE',
                  });
                  this.props.addToFavourites(trip);
                }
              }}
            />
            <Snackbar message={this.state.snackbarMessage} />
            <FlatButton
              labelStyle={{ fontSize: '0.8em' }}
              label="CANCEL"
              onClick={() => {
                this.props.setCurrentTrip(null);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { currentTrip, busStops, trainStations } = this.props;
    let start;
    let end;
    let startDescription;
    let endDescription;
    if (currentTrip) {
      if (currentTrip.bus) {
        start = busStops[currentTrip.start];
        end = busStops[currentTrip.end];
        startDescription = (start || {}).description;
        endDescription = (end || {}).description;
      } else {
        startDescription = currentTrip.start;
        endDescription = currentTrip.end;
        start = (trainStations[currentTrip.start] || {}).id;
        end = (trainStations[currentTrip.end] || {}).id;
      }
    }
    return (
      <div>
        <Paper zDepth={3} styleName="paper">
          {currentTrip ? this.renderTrip(startDescription, endDescription) : <div styleName="label">You have not started a journey</div>
          }
        </Paper>
        <Maps
          start={start}
          end={end}
          isBus={!!currentTrip && !!currentTrip.bus}
        />
      </div>
    );
  }
}

export default Journey;
