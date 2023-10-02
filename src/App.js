import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import store from './store'

class App extends Component {
  render() {
  return (
    <Provider store={store}>
      <div className="App d-flex flex-column align-items-center w-100">
        <Container>
          <Outlet />
        </Container>
      </div>
    </Provider>
  );
}}

export default App;
