import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import Schedule from './pages/Schedule';

import './css/Login.css';
import './css/App.css';
import './css/Column.css';
import './css/ColumnDay.css';
import './css/Dashboard.css';
import './css/TaskCard.css';
import './css/Task.css';
import './css/Modal.css';

import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
M.AutoInit();

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/schedule" component={Schedule} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
