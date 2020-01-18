import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getNetworks } from '../services/networkService';
import { getPerson, savePeople } from '../services/peopleService';

class PeopleForm extends Form {
  state = {
    data: {
      name: '',
      email: '',
    },
    networks: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    networkId: Joi.string()
      .required()
      .label('Network'),
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
      .label('Name'),
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required()
      .label('Name'),
  };

  async populateNetworks() {
    const { data: networks } = await getNetworks();
    this.setState({ networks });
  }

  async populatePerson() {
    try {
      const personId = this.props.match.params.id;
      if (personId === 'new') return;

      const { data: person } = await getPerson(personId);
      this.setState({ data: this.mapToViewModel(person) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateNetworks();
    await this.populatePerson();
  }

  mapToViewModel(person) {
    return {
      name: person.name,
      email: person.email,
    };
  }

  doSubmit = async () => {
    await savePeople(this.state.data);

    this.props.history.push('/people');
  };

  render() {
    return (
      <div className='col-6'>
        <h1>Person Data</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('name', 'Name')}
          {this.renderInput('email', 'Email')}
          {this.renderSelect('networkId', 'Networks', this.state.networks)}
        </form>
      </div>
    );
  }
}

export default PeopleForm;
