import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
// import AddPost from 'AddPost';
import Posts from './Posts';
import AddPost from './AddPost';
import AddComment  from "./AddComment";
import { Route } from 'react-router-dom';
import PostContent from "./PostContent";


class App extends Component {
  render() {
    return (
      <div className='container-fluid'>
          <Route exact path='/' render={ () => (
            <Posts />
          )}/>
          <Route path="/category/:category" render={(props) => (
              <Posts category={props.match.params.category}/>
          )}/>
          <Route path="/add/post/:category?" render={(props) => (
              <AddPost {...props} category={props.match.params.category}/>
          )}/>
          <Route path="/add/comment/:parentId" render={(props) => (
              <AddComment {...props} parentId={props.match.params.parentId}/>
          )}/>
          <Route path="/posts/:postid" render={(props) => (
              <PostContent postid={props.match.params.postid}/>
          )}/>
      </div>
    );
  }
}

export default App;
