import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Posts from './components/posts';
import PostForm from './components/postForm';
import PeopleForm from './components/peopleForm';
import NotFound from './components/notFound';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  state = {}
  render() {
    return (
      <>
        <ToastContainer />
        <main className="container col-md-10">
          <Switch>
            <Route
              path='/people/:id'
              render={props => <PeopleForm {...props}/>}
            />
            <Route
              path='/people' component={PeopleForm}
            />
            <Route
              path='/post/:id'
              render={props => <PostForm {...props}/>}
            />
            <Route
              path='/post'
              render={props => <Posts {...props}/>}
            />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/post' />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
