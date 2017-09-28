import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';

import Home from './search/HomeContainer';
import Favourites from './favourites/FavouritesContainer';
import Journey from './journey/JourneyContainer';

import './Tabs.css';

const App = props => (
  <MuiThemeProvider>
    <div>
      <div styleName="tab">
        {props.slideIndex === 0 && <Home />}
        {props.slideIndex === 1 && <Journey />}
        {props.slideIndex === 2 && <Favourites />}
        {props.slideIndex === 3 && 'Settings'}
      </div>
      <div styleName="navigation">
        <BottomNavigation selectedIndex={props.slideIndex}>
          <BottomNavigationItem
            icon={<FontIcon className="material-icons">search</FontIcon>}
            label="Home"
            onClick={() => props.setSlideIndex(0)}
          />
          <BottomNavigationItem
            icon={<FontIcon className="material-icons">location_on</FontIcon>}
            label="Journey"
            onClick={() => props.setSlideIndex(1)}
          />
          <BottomNavigationItem
            icon={<FontIcon className="material-icons">favorite</FontIcon>}
            label="Favourites"
            onClick={() => props.setSlideIndex(2)}
          />
          <BottomNavigationItem
            icon={<FontIcon className="material-icons">settings</FontIcon>}
            label="Settings"
            onClick={() => props.setSlideIndex(3)}
          />
        </BottomNavigation>
      </div>
    </div>
  </MuiThemeProvider>
);

export default App;
