import React from 'react';
import TripInfo from './TripInfo';
import './Journey.css';

const API_KEY = 'AIzaSyA2AhaWAntXpasV6qrmiugcvBwaXDIyAls';

class Favourites extends React.Component {
  componentWillMount() {
    this.props.getBusArrival(this.props.startStop, this.props.endStop);
  }

  renderTrip() {
    if (!this.props.eta) {
      return (
        <div>
          Trip is not available
        </div>
      );
    }
    return (
      <div>
        <TripInfo
          trip={this.props.currentTrip}
          startStop={this.props.start}
          endStop={this.props.end}
        />
        {this.props.eta} min till arrival
      </div>
    );
  }

  render() {
    const { currentTrip, startStop, endStop } = this.props;
    const start = currentTrip.bus ? (startStop || {}).description : startStop;
    const end = currentTrip.bus ? (endStop || {}).description : endStop;

    return (
      <div>
        {currentTrip ? this.renderTrip() : <span styleName="label">You have not started a journey</span>
        }
        <div styleName="map">
          <iframe
            styleName="mapframe"
            title="Google Maps"
            width="100%"
            height="400"
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/directions?key=${API_KEY}` +
                 `&origin=${start}&destination=${end}&mode=transit`}
            allowFullScreen
          />
        </div>
      </div>
    );
  }
}

export default Favourites;
