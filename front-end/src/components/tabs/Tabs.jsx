import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

import Home from '../home/HomeContainer';
import Favourites from '../favourites/FavouritesContainer';
import Journey from '../journey/JourneyContainer';
import WelcomeScreen from '../home/WelcomeScreen';
import About from '../about/About';

import './Tabs.css';

const muiTheme = getMuiTheme({
  ...darkBaseTheme,
  bottomNavigation: {
    backgroundColor: '#220a32',
  },
  stepper: {
    textColor: '#ffffff',
    disabledTextColor: 'grey',
  },
  paper: {
    backgroundColor: '#181818',
  },
  snackbar: {
    textColor: '#ffffff',
    backgroundColor: '#181818',
  },
  raisedButton: {
    primaryTextColor: '#ffffff',
    secondaryTextColor: '#ffffff',
  },
});


class App extends React.Component {
  state = {
    isAtWelcomeScreen: true,
  }
  componentDidMount() {
    this.calcVH();
    window.addEventListener('onorientationchange', this.calcVH);
  }

  componentWillUnmount() {
    window.removeEventListener('onorientationchange', this.calcVH);
  }

  calcVH() { // https://stackoverflow.com/questions/39384154/calculating-viewport-height-on-chrome-android-with-css
    const vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.ref.setAttribute('style', `height:${vH}px;`);
  }

  render() {
    const props = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div styleName="container" ref={(ref) => { this.ref = ref; }}>
          <div styleName="tab">
            {props.slideIndex === 0 &&
              (this.state.isAtWelcomeScreen
                ? <WelcomeScreen onBeginJourney={() => this.setState({ isAtWelcomeScreen: false })} />
                : <Home />)}
            {props.slideIndex === 1 && <Journey />}
            {props.slideIndex === 2 && <Favourites />}
            {props.slideIndex === 3 && <About />}
          </div>
          <Paper styleName={props.slideIndex === 2 ? 'nav' : ''}>
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
                icon={<FontIcon className="material-icons">info</FontIcon>}
                label="About"
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
