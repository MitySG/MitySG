import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

import Home from './search/HomeContainer';
import Favourites from './favourites/FavouritesContainer';
import Journey from './journey/JourneyContainer';

import './Tabs.css';

const muiTheme = getMuiTheme({
  bottomNavigation: {
    backgroundColor: '#220a32',
    unselectedColor: 'grey',
  },
  stepper: {
    textColor: 'white',
    disabledTextColor: 'white',
  },
  paper: {
    backgroundColor: '#181818',
  },
});


class App extends React.Component {
  componentDidMount() {
    this.calcVH();
    window.addEventListener('onorientationchange', this.calcVH);
  }

  componentWillUnmount() {
    window.removeEventListener('onorientationchange', this.calcVH);
  }

  calcVH() {
    const vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.ref.setAttribute('style', `height:${vH}px;`);
  }

  render() {
    const props = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div styleName="container" ref={(ref) => { this.ref = ref; }}>
          <div styleName="tab">
            {props.slideIndex === 0 && <Home />}
            {props.slideIndex === 1 && <Journey />}
            {props.slideIndex === 2 && <Favourites />}
            {props.slideIndex === 3 && 'Settings'}
          </div>
          <Paper>
            <BottomNavigation selectedIndex={props.slideIndex}>
              <BottomNavigationItem
                icon={<FontIcon className="material-icons">home</FontIcon>}
                label="Home"
                onClick={() => props.setSlideIndex(0)}
              />
              <BottomNavigationItem
                icon={<FontIcon className="material-icons">directions_bus</FontIcon>}
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
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
