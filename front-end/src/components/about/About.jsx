import React from 'react';
import Paper from 'material-ui/Paper';
import './About.css';

class About extends React.Component {
  componentDidMount() {
    window.ga('set', 'page', '/About');
    window.ga('send', 'pageview');
  }

  render() {
    return (
      <Paper styleName="paper" zDepth={3}>
        <div styleName="title">About</div>
        <p>Always missing your bus or stop because your phone distracts you?</p>
        <p>Mity is here to offer you a worry-free journey!</p>
        <p>You will be prompted when your bus is arriving and when you are approaching your destination!</p>
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
    );
  }
}


export default About;
