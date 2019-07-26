import React, { Component } from 'react';
import axios from 'axios';

class ClassFibonacci extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };
  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    console.dir(values);
    this.setState({
      values: values.data
    });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    await axios.post('api/values', {
      index: this.state.index
    });

    this.setState({ index: '' });
  };

  render() {
    const { seenIndexes, values, index } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Seen indexes:</h3>
        <p>{seenIndexes.map(({ number }) => number).join(', ')}</p>
        <h3>Calculated values:</h3>
        {Object.entries(values).length !== 0 && (
          <ul>
            {Object.entries(values).map(({ key, value }) => (
              <li key={key}>
                For index {key}, I've calculated {value}{' '}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default ClassFibonacci;
