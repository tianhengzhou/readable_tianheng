import React, { Component } from 'react';
import '../App.css';
import Posts from './Posts';
import AddPost from './AddPost';
import AddComment  from "./AddComment";
import { Switch , Route } from 'react-router-dom';
import PostContent from "./PostContent";


class App extends Component {
  render() {
    return (
      <div className='container-fluid'>
          <Switch>
              <Route exact path='/' render={ () => (
                  <Posts />
              )}/>
              <Route exact path="/:category" render={(props) => (
                  <Posts category={props.match.params.category}/>
              )}/>
              <Route path="/create/post/:category?" render={(props) => (
                  <AddPost {...props} category={props.match.params.category}/>
              )}/>
              <Route path="/create/comment/:parentId" render={(props) => (
                  <AddComment {...props} parentId={props.match.params.parentId}/>
              )}/>
              <Route path="/:category/:postid" render={(props) => (
                  <PostContent postid={props.match.params.postid}/>
              )}/>
          </Switch>

      </div>
    );
  }
}

export default App;
