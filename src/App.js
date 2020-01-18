import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Posts from './components/posts';
import NotFound from './components/notFound';
import 'react-toastify/dist/ReactToastify.css';
import PostForm from './components/postForm';

class App extends Component {
  state = {  }
  render() {
    return (
      <>
        <ToastContainer />
        <main className="container col-md-10">
          <Switch>
            <Route
              path='/post/:id' component={PostForm}
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
