import React, {Component} from 'react';
import Room from "./containers/Room";
import {DndProvider} from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import Login from './components/Login'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


const App = () => {
  return (
    <DndProvider backend = {Backend}>
      <Router>
        <Switch>
          
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/rooms/:id' component = {Room} />
        </Switch>
      </Router>
    </DndProvider>
  )
}

export default App;
