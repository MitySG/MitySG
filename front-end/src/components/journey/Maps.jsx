import React from 'react';
import './Maps.css';

const API_KEY = 'AIzaSyA2AhaWAntXpasV6qrmiugcvBwaXDIyAls';

class Maps extends React.Component {
  componentDidMount() {
    this.calcVH();
    window.addEventListener('onorientationchange', this.calcVH);
  }

  componentWillUnmount() {
    window.removeEventListener('onorientationchange', this.calcVH);
  }

  calcVH() { // https://stackoverflow.com/questions/39384154/calculating-viewport-height-on-chrome-android-with-css
    const vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.ref.setAttribute('style', `height:calc(${vH}px - 265px);`);
  }

  render() {
    const { start, end, currentCoords } = this.props;
    const mode = 'place'; // start ? 'directions' : 'place';
    const query = mode === 'directions' ? `&origin=${encodeURIComponent(start)}&destination=${encodeURIComponent(end)}&mode=transit`
      : `&q=${currentCoords.latitude},${currentCoords.longitude}`;
    return (
      <iframe
        title="Google maps"
        ref={(ref) => { this.ref = ref; }}
        styleName="mapframe"
        frameBorder="0"
        src={`https://www.google.com/maps/embed/v1/${mode}?key=${API_KEY}${query}`}
        allowFullScreen
      />
    );
  }
}

export default Maps;
