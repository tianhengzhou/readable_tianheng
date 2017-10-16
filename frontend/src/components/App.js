import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
// import AddPost from 'AddPost';
import Posts from './Posts';
import AddPost from './AddPost';
import { Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <Route exact path='/' render={ () => (
            <Posts />
        )}/>
        <Route path="/add/post/:category?" render={(props) => (
          <AddPost {...props} category={props.match.params.category}/>
        )}/>
      </div>
    );
  }
}

export default App;
