import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getPosts, savePost } from '../services/postService';
import { getNetworks } from '../services/networkService';
import { getPeople } from '../services/peopleService';

class PostForm extends Form {
  state = {
    data: {
      authorId: '',
      networkId: '',
      post_date: '',
      post_link: '',
    },
    authors: [],
    networks: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    authorId: Joi.string()
      .required()
      .label('Author'),
    networkId: Joi.string()
      .required()
      .label('Network'),
    post_date: Joi.date()
      .required()
      .label('Post Date'),
    post_link: Joi.string()
      .required()
      .min(5)
      .max(300)
      .label('Post Link'),
  };

  async populateAuthors() {
    const { data: authors } = await getPeople();
    this.setState({ authors });
  }

  async populateNetworks() {
    const { data: networks } = await getNetworks();
    this.setState({ networks });
  }

  async populatePost() {
    try {
      const postId = this.props.match.params.id;
      if (postId === 'new') return;

      const { data: post } = await getPosts(postId);
      this.setState({ data: this.mapToViewModel(post) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateAuthors();
    await this.populateNetworks();
    await this.populatePost();
  }

  mapToViewModel(post) {
    return {
      _id: post._id,
      authorId: post.author._id,
      networkId: post.network._id,
      post_date: post.post_date,
      post_link: post.post_link,
    };
  }

  doSubmit = async () => {
    await savePost(this.state.data);

    this.props.history.push('/post');
  };

  render() {
    return (
      <div className='col-5'>
        <h1>Post Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect('authorId', 'Author', this.state.authors)}
          {this.renderSelect('networkId', 'Network', this.state.networks)}
          {this.renderInput('post_date', 'Post Date', 'date')}
          {this.renderInput('post_link', 'Post Link')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default PostForm;
