import React, { Component } from 'react';
import '../App.css';
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
          <Route  path="/c/:category" render={(props) => (
              <Posts category={props.match.params.category}/>
          )}/>
          <Route path="/create/post/:category?" render={(props) => (
              <AddPost {...props} category={props.match.params.category}/>
          )}/>
          <Route path="/create/comment/:parentId" render={(props) => (
              <AddComment {...props} parentId={props.match.params.parentId}/>
          )}/>
          <Route path="/p/:category/:postid" render={(props) => (
              <PostContent postid={props.match.params.postid}/>
          )}/>
      </div>
    );
  }
}

export default App;
