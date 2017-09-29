import React from 'react';
import Button from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TripInfo from '../journey/TripInfo';
import './Favourites.css';

class Favourites extends React.Component {
  constructor(props) {
    super(props);
    window.ga('set', 'page', '/Favourites');
  }

  componentDidMount() {
    this.calcVH();
    window.addEventListener('onorientationchange', this.calcVH);
  }

  componentWillUnmount() {
    window.removeEventListener('onorientationchange', this.calcVH);
  }

  calcVH() { // https://stackoverflow.com/questions/39384154/calculating-viewport-height-on-chrome-android-with-css
    const vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.ref.setAttribute('style', `height:${vH - 60}px;`);
  }

  render() {
    const { favourites, busStops, trainStations, removeFromFavourites, setCurrentTrip, setSlideIndex } = this.props;
    return (
      <div styleName="container">
        <div ref={(ref) => { this.ref = ref; }}>

          <Paper styleName="paper" zDepth={3} >
            <div styleName="title">Favourites</div>
            <div styleName="list">
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
      </div>
    );
  }
}


export default Favourites;
