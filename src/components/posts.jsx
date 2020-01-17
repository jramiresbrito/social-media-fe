import React, { Component } from 'react';
import Moment from 'moment';
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
    console.log(posts);
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
        {this.state.posts.map(post => <tr key={post._id}>
            <td>{post.author.name}</td>
            <td>{Moment(post.post_date).format('DD-MM-YYYY')}</td>
            <td>{post.network.name}</td>
            <td>{post.people_lists.map(list => `${list._id} ` )}</td>
            <td>{post.post_link}</td>
          </tr>)}
        </tbody>
      </table>
    );
  }
}

export default Posts;
