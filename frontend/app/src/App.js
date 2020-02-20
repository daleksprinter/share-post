import React, {Component} from 'react';
import Room from "./containers/Room";
import {DndProvider} from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import Login from './components/Login'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Join from './components/Join'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


const App = () => {
  console.log(process.env.REACT_APP_BACKEND_HOST)
  return (
    <DndProvider backend = {Backend}>
      <Router>
        <NavBar />
        <Switch>
            <Route exact path = '/' component = {Home} />
            <Route exact path = '/join' component = {Join} />
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/rooms/:id' component = {Room} />
        </Switch>
      </Router>
    </DndProvider>
  )
}

export default App;
