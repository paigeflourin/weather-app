import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Detail from './Detail';
import Forecast from './Forecast';
import Form from './Form';
import appClasses from './App.css';


import logo from './logo.svg';

const App = () => (
  <BrowserRouter>
    <div style={{ height: '100%' }}>
    <Route
        render={props => (
          <div className={appClasses.navbar}>
            <h1>Weather</h1>
            <Form
              flexDirection="row"
              onSubmit={(city) => {
                props.history.push({ // eslint-disable-line
                  pathname: '/forecast',
                  search: `?city=${city}`,
                });
              }}
            />
          </div>
        )}
      />
      
      <Route path="/forecast" component={Forecast} />
      <Route path="/details/:day" component={Detail} />
    </div>
  </BrowserRouter>
);

export default App;