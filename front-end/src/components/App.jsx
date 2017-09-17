import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import FontIcon from 'material-ui/FontIcon';

import Search from './SearchContainer';
import Favourites from './favourites/FavouritesContainer';

const styles = {
  slide: {
    padding: 20,
  },
};

export default class TabsExampleSwipeable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Tabs
            value={this.state.slideIndex}
            onChange={slideIndex => this.setState({ slideIndex })}
          >
            <Tab
              icon={<FontIcon className="material-icons">search</FontIcon>}
              label="Search"
              value={0}
            />
            <Tab
              icon={<FontIcon className="material-icons">favorite</FontIcon>}
              label="Favourites"
              value={1}
            />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <div style={styles.slide}>
              <Search />
            </div>
            <div style={styles.slide}>
              <Favourites />
            </div>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}
