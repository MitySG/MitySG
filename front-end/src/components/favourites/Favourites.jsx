import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Button from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const Favourites = ({ favourites, busStops, removeFromFavourites }) => (
  <List>
    {favourites.map((favourite) => {
      const favouriteStringified = JSON.stringify(favourite);
      return (
        <ListItem
          key={favouriteStringified}
          primaryText={favourite.bus}
          secondaryText={`${busStops[favourite.start].description} => ${busStops[favourite.end].description}`}
          rightIconButton={<Button label="Start">
            <FontIcon className="material-icons">directions_bus</FontIcon>
          </Button>}
          leftIcon={
            <FontIcon
              className="material-icons"
              onClick={() => removeFromFavourites(favouriteStringified)}
            >
              favorite_border
            </FontIcon>
          }
        />
      );
    })}
  </List>
  );


export default Favourites;
