import React, { Component } from 'react';

class Posts extends Component {
  state = {
    posts: [],
    networks: [],
   }
  render() {
    return (
    <table className='table table-hover table-striped'>
      <thead>
        <tr>
          <th>Author</th>
          <th>Date</th>
          <th>Network</th>
          <th>Lists</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="#">Author Name</a></td>
          <td>Post Date</td>
          <td>Post Network</td>
          <td>People Lists</td>
          <td><a href="#">Link</a></td>
        </tr>
      </tbody>
    </table>
    );
  }
}

export default Posts;
