import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Moment from 'moment';
import Table from './common/table';

class PostsTable extends Component {
  columns = [
    {
      path: 'author',
      label: 'Author',
      content: post => <Link to={`/people/${post.author._id}`}>{post.author.name}</Link>
    },
    {
      path: 'post_date',
      label: 'Date',
      content: post => Moment(post.post_date).format('DD-MM-YYYY'),
    },
    { path: 'network.name', label: 'Network'},
    {
      path: 'post_link',
      label: 'Link',
      content: post => <a href={post.post_link}>{post.post_link}</a>
    },
  ]

  render() {
    const {posts, onSort, sortColumn} = this.props;
    return (
      <Table
        columns={this.columns}
        data={posts}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PostsTable;
