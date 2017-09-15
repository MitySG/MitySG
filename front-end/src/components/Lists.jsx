import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Lists = ({ lists }) => (
  <MuiThemeProvider >
    <List>
      {lists.map(list => (
        <div key={list.header}>
          <Subheader>{list.header}</Subheader>
          {list.items.map(item => (
            <ListItem
              key={item}
              primaryText={item}
            />
              ))}
          <Divider />
        </div>
          ))}
    </List>
  </MuiThemeProvider>
  );


export default Lists;
