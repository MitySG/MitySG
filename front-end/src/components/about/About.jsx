import React from 'react';
import Paper from 'material-ui/Paper';
import './About.css';

class About extends React.Component {
  componentDidMount() {
    this.calcVH();
    window.addEventListener('onorientationchange', this.calcVH);
    window.ga('set', 'page', '/About');
    window.ga('send', 'pageview');
  }

  componentWillUnmount() {
    window.removeEventListener('onorientationchange', this.calcVH);
  }

  calcVH() { // https://stackoverflow.com/questions/39384154/calculating-viewport-height-on-chrome-android-with-css
    const vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.ref.setAttribute('style', `height:${vH - 60}px;`);
  }

  render() {
    return (
      <div styleName="container">
        <div ref={(ref) => { this.ref = ref; }}>
          <Paper styleName="paper" zDepth={3}>
            <div styleName="title">About</div>
            <p>Always missing your bus or stop because your phone distracts you?</p>
            <p>Worry not as Mity is a public transport application unlike any other.</p>
            <p>Offering a worry-free journey, You will be prompted when your bus is arriving and when you are approaching your destination.</p>
            <p>Using a mix of Google Maps and LTA APIs, we ensure a high level of accuracy.</p>
            <p>{"No battery draining background GPS, no need to constantly check any app. We've got you covered!"}</p>
            <div styleName="title">Contact</div>
            <p>
              {'This app is created by '}
              {Object.entries({
                Riwu: 'https://github.com/riwu',
                Han: 'https://github.com/han-gyeol',
                Jeremy: 'https://github.com/SorataYuu',
                Jaron: 'https://github.com/jaron-j2',
              }).map(([name, url], index) => (
                <span key={name}>
                  <a styleName="link" target="_blank" rel="noreferrer noopener" href={url}>{name}</a>
                  {index === 3 ? '' : ', '}
                </span>
              ))}
              {' between 10 Sep 2017 to 30 Sep 2017 for '}
              <a styleName="link" target="_blank" rel="noreferrer noopener" href="http://www.cs3216.com/coursework/mobile/">CS3216 assignment 3</a>.
            </p>
            <p>You can contact us <a styleName="link" target="_blank" rel="noreferrer noopener" href="https://github.com/MitySG/MitySG/issues">here</a>.</p>
          </Paper>
        </div>
      </div>
    );
  }
}


export default About;
