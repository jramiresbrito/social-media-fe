import React, { Component } from 'react';
import { getPosts } from '../services/postService';
import { getNetworks } from '../services/networkService';

class Posts extends Component {
  state = {
    posts: [],
    networks: [],
  }

  async componentDidMount() {
    const {data} = await getNetworks();
    const networks = [{ _id: '', name: 'All Networks'}, ...data];

    const {data: posts} = await getPosts();
    this.setState({posts, networks});
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
