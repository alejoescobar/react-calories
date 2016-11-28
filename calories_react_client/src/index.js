import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import Registration from './views/Registration'
import Login from './views/Login'
import { Router, Route, browserHistory } from 'react-router'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/registration" component={Registration} />
    <Route path="/login" component={Login} />
  </Router>,
  document.getElementById('root')
);
