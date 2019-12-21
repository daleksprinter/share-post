import React, {Component} from 'react';
import Room from "./containers/Room";
import {DndProvider} from 'react-dnd';
import Backend from 'react-dnd-html5-backend';


const App = () => {
  return (
    <DndProvider backend={Backend}>
      <Room />
    </DndProvider>
  )
}

export default App;
