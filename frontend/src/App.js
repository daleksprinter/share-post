import React, {Component} from 'react';
import Category from "./components/Room"


class App extends Component{
  constructor(){
    super()
  }

  componentDidMount(){
    const categories_url = "http://localhost:8080/rooms/1/categories"
    fetch(categories_url).then(res => {
      return res.json()
    }).then(json => {
      for(const category of json) this.props.addCategory(category);
    })



  }

  render(){
    return (
      this.props.category.categories.map(val => {
        return(
          <Category data = {val} />
        )
      })
    )
  }
}

export default App;
