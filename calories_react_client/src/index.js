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
import EditUser from './views/EditUser'
import AdminCalories from './views/AdminCalories'
import NewAdminCaloriesEntry from './views/AdminNewCaloriesEntry'
import EditAdminCaloriesEntry from './views/AdminEditCaloriesEntry'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Registration} />
      <Route path="/login" component={Login} />
      <Route component={UserNav}>
        <Route path="/calories" component={Calories} />
        <Route path="/calories/new" component={NewCaloriesEntry} />
        <Route path="/calories/:entryId/edit" component={EditCaloriesEntry} />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/users/new" component={NewUser} />
        <Route path="/admin/users/edit/:userId" component={EditUser} />
        <Route path="/admin/users/:userId/calories" component={AdminCalories} />
        <Route path="/admin/users/:userId/calories/new" component={NewAdminCaloriesEntry} />
        <Route path="/admin/users/:userId/calories/:id/edit" component={EditAdminCaloriesEntry} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
