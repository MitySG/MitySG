import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import push from './push';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
push.subscribe();
