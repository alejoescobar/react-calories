import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import Registration from './views/Registration'
import Login from './views/Login'
import Calories from './views/Calories'
import UserNav from './views/UserNav'
import NewCaloriesEntry from './views/NewCaloriesEntry'
import EditCaloriesEntry from './views/EditCaloriesEntry'
import Users from './views/Users'
import NewUser from './views/NewUser'
import { Router, Route, browserHistory } from 'react-router'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/registration" component={Registration} />
    <Route path="/login" component={Login} />
    <Route component={UserNav}>
      <Route path="/calories" component={Calories} />
      <Route path="/calories/new" component={NewCaloriesEntry} />
      <Route path="/calories/edit/:entryId" component={EditCaloriesEntry} />
      <Route path="/admin/users" component={Users} />
      <Route path="/admin/users/new" component={NewUser} />
    </Route>
  </Router>,
  document.getElementById('root')
);
