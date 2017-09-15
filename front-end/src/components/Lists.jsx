import React from 'react';
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Lists = ({ list }) => (
  <MuiThemeProvider >
    <List>
      {list.map(bus => (
        <ListItem
          key={bus.code}
          primaryText={bus.description}
          secondaryText={bus.code}
        />
      ))}
    </List>
  </MuiThemeProvider>
  );


export default Lists;
