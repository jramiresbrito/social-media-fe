import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PostsTable from './postsTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import SearchBox from './searchBox';
import { paginate } from '../utils/paginate';
import { getPosts } from '../services/postService';
import { getNetworks } from '../services/networkService';

class Posts extends Component {
  state = {
    posts: [],
    networks: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: '',
    selectedNetwork: null,
    sortColumn: {path: 'author.name', order: 'asc'},
  }

  async componentDidMount() {
    const {data} = await getNetworks();
    const networks = [{ _id: '', name: 'All Networks'}, ...data];

    const {data: posts} = await getPosts();
    this.setState({posts, networks});
  };

  handlePageChange = page => {
    this.setState({currentPage: page});
  };

  handleNetworkSelect = network => {
    this.setState({selectedNetwork: network, searchQuery: '', currentPage: 1})
  };

  handleSearch = query => {
    this.setState({searchQuery: query, selectedNetwork: null, currentPage: 1});
  };

  handleSort = sortColumn => {
    this.setState({sortColumn});
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedNetwork,
      searchQuery,
      posts: allPosts,
    } = this.state;

    let filtered = allPosts;
    if (searchQuery)
      filtered = allPosts.filter(p =>
        p.author.name.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );
    else if (selectedNetwork && selectedNetwork._id)
        filtered = allPosts.filter(p => p.network._id === selectedNetwork._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const posts = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: posts };
  };


  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data: posts } = this.getPagedData();

    return (
      <div className='row'>
        <div className="col-3">
          <ListGroup
            items={this.state.networks}
            selectedItem={this.state.selectedNetwork}
            onItemSelect={this.handleNetworkSelect}
          />
        </div>
        <div className="col">
          <Link
            to='/post/new'
            className='btn btn-primary'
            style={{marginBottom: 20}}
          >
            New Post
          </Link>
          <p style={{fontWeight: '700'}}>
            Showing {totalCount} posts in the database.
          </p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <PostsTable
            posts={posts}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Posts;
