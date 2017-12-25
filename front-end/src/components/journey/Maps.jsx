import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from 'react-google-maps';
import './Maps.css';
import icon from '../../images/location.png';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// default to NUS if no geolocation detection
const defaultCenter = {
  latitude: 1.295053,
  longitude: 103.771652,
};

class Maps extends React.Component {
  state = {
    directions: null,
  };

  componentDidMount() {
    if (this.props.start) {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: this.props.isBus
            ? new google.maps.LatLng(this.props.start.latitude, this.props.start.longitude)
            : { placeId: this.props.start },
          destination: this.props.isBus
            ? new google.maps.LatLng(this.props.end.latitude, this.props.end.longitude)
            : { placeId: this.props.end },
          travelMode: google.maps.TravelMode.TRANSIT,
          transitOptions: {
            modes: [this.props.isBus ? google.maps.TransitMode.BUS : google.maps.TransitMode.TRAIN],
            routingPreference: google.maps.TransitRoutePreference.LESS_WALKING,
          },
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        },
      );
    }
  }

  render() {
    const props = this.props;
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{
          lat: props.currentCoords.latitude || defaultCenter.latitude,
          lng: props.currentCoords.longitude || defaultCenter.longitude,
        }}
      >
        {this.state.directions &&
          props.start && <DirectionsRenderer directions={this.state.directions} />}
        {props.currentCoords.latitude && (
          <Marker
            icon={icon}
            position={{ lat: props.currentCoords.latitude, lng: props.currentCoords.longitude }}
          />
        )}
      </GoogleMap>
    );
  }
}

const ConnectedMaps = withScriptjs(withGoogleMap(Maps));

const MapWithProps = props => (
  <div>
    <ConnectedMaps
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
      loadingElement={<div styleName="others" />}
      containerElement={<div styleName="map" />}
      mapElement={<div styleName="others" />}
      {...props}
    />
  </div>
);

export default MapWithProps;
