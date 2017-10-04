import React from 'react';
import Button from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TripInfo from '../journey/TripInfo';
import { setContentVh } from '../calcVH';
import './Favourites.css';

class Favourites extends React.Component {
  componentDidMount() {
    setContentVh(this.ref);
    window.ga('set', 'page', '/Favourites');
    window.ga('send', 'pageview');
  }

  render() {
    const { favourites, busStops, trainStations, removeFromFavourites, setCurrentTrip, setSlideIndex } = this.props;
    return (
      <div styleName="container" ref={(ref) => { this.ref = ref; }}>
        <Paper styleName="paper" zDepth={3} >
          <div styleName="title">Favourites</div>
          <div>
            {favourites.map((favourite, index) => {
              const favouriteStringified = JSON.stringify(favourite);
              return (
                <div key={favouriteStringified}>
                  <div styleName="listItem">
                    <TripInfo
                      trip={favourite}
                      startStop={favourite.bus
                        ? (busStops[favourite.start] || {}).description
                        : favourite.start}
                      endStop={favourite.bus
                        ? (busStops[favourite.end] || {}).description
                        : favourite.end}
                    />
                    <div styleName="buttons">
                      <Button
                        styleName="button"
                        buttonStyle={{ borderRadius: '20px' }}
                        primary={!!favourite.bus}
                        secondary={!favourite.bus}
                        label="Start"
                        onClick={() => {
                          setCurrentTrip(favourite, trainStations);
                          setSlideIndex(1);
                        }}
                        icon={
                          <FontIcon className="material-icons">
                            {favourite.bus ? 'directions_bus' : 'train'}
                          </FontIcon>
                        }
                      />
                      <FlatButton
                        labelStyle={{ fontSize: '0.8em' }}
                        label="Remove"
                        onClick={() => removeFromFavourites(favouriteStringified)}
                      />
                    </div>
                  </div>
                  {index < favourites.length - 1 && <Divider />}
                </div>
              );
            })}
          </div>
        </Paper>
      </div>
    );
  }
}


export default Favourites;
