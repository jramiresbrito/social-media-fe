import React, { Component } from 'react';

class Posts extends Component {
  state = {  }
  render() {
    return (
    <table className='table table-hover table-striped'>
      <thead>
        <tr>
          <th>Link</th>
          <th>Author</th>
          <th>Date</th>
          <th>Network</th>
          <th>Lists</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="#">Link</a></td>
          <td>Author Name</td>
          <td>Post Date</td>
          <td>Post Network</td>
          <td>People Lists</td>
        </tr>
      </tbody>
    </table>
    );
  }
}

export default Posts;
