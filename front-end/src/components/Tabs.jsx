import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import FontIcon from 'material-ui/FontIcon';

import Search from './search/SearchContainer';
import Favourites from './favourites/FavouritesContainer';
import Journey from './journey/JourneyContainer';

const styles = {
  slide: {
    padding: 20,
  },
};

export default class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Tabs
            value={this.props.slideIndex}
            onChange={this.props.setSlideIndex}
          >
            <Tab
              icon={<FontIcon className="material-icons">search</FontIcon>}
              label="Search"
              value={0}
            />
            <Tab
              icon={<FontIcon className="material-icons">location_on</FontIcon>}
              label="Journey"
              value={1}
            />
            <Tab
              icon={<FontIcon className="material-icons">favorite</FontIcon>}
              label="Favourites"
              value={2}
            />
            <Tab
              icon={<FontIcon className="material-icons">settings</FontIcon>}
              label="Settings"
              value={3}
            />
          </Tabs>
          <SwipeableViews
            index={this.props.slideIndex}
            onChangeIndex={this.props.setSlideIndex}
          >
            <div style={styles.slide}>
              <Search />
            </div>
            <div style={styles.slide}>
              <Journey />
            </div>
            <div style={styles.slide}>
              <Favourites />
            </div>
            <div style={styles.slide}>
              Settings
            </div>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}
