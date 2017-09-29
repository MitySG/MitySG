import React from 'react';
import { List } from 'material-ui/List';
import Button from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import TripInfo from '../journey/TripInfo';

const Favourites = ({ favourites, busStops, trainStations, removeFromFavourites, setCurrentTrip, setSlideIndex }) => (
  <Paper zDepth={3}>
    <List>
      {favourites.map((favourite) => {
        const favouriteStringified = JSON.stringify(favourite);
        return (
          <div key={favouriteStringified}>
            <TripInfo
              trip={favourite}
              startStop={favourite.bus
                ? (busStops[favourite.start] || {}).description
                : favourite.start}
              endStop={favourite.bus
                ? (busStops[favourite.end] || {}).description
                : favourite.end}
            />
            <Button
              label="Start"
              onClick={() => {
                setCurrentTrip(favourite, trainStations);
                setSlideIndex(1);
              }}
            >
              <FontIcon className="material-icons">directions_bus</FontIcon>
            </Button>

            <FontIcon
              className="material-icons"
              onClick={() => removeFromFavourites(favouriteStringified)}
            >
            favorite_border
            </FontIcon>
          </div>
        );
      })}
    </List>
  </Paper>
);


export default Favourites;
