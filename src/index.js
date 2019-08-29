import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
// import 'materialize-css'; // It installs the JS asset only
// import 'materialize-css/dist/css/materialize.min.css';
import './bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
// import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'
import 'react-notifications/lib/notifications.css';

// import '@blueprintjs/icons/lib/css/blueprint-icons.css'
// import '@blueprintjs/core/lib/css/blueprint.css'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
// import 'semantic-ui-css';
// import 'semantic-ui/dist/semsantic.min.css'



// console.log(store.getState().stock);

ReactDOM.render(

  <Provider store={ store }>
    <App /> 
  </Provider>,
  
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();  

