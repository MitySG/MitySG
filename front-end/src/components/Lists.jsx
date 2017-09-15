import React from 'react';
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Lists = ({ list }) => (
  <MuiThemeProvider >
    <List>
      {list.map(item => (
        <ListItem
          key={item}
          primaryText={item}
        />
      ))}
    </List>
  </MuiThemeProvider>
  );


export default Lists;
