import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Button from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const Favourites = ({ favourites, busStops }) => (
  <List>
    {favourites.map(favourite => (
      <ListItem
        key={favourite}
        primaryText={favourite.bus}
        secondaryText={`${busStops[favourite.start].description} => ${busStops[favourite.end].description}`}
        rightIconButton={<Button label="Start">
          <FontIcon className="material-icons">directions_bus</FontIcon>
        </Button>}
      />
      ))}
  </List>
  );


export default Favourites;
