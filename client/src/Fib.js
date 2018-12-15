import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  }

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const indexes = await axios.get('/api/values/all');
    this.setState({ seenIndexes: indexes.data });
  }

  renderSeenIndexes() {
    return [];
    return this.state.seenIndexes.map(({ number }) => {
      return number
    }).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    axios.post('/api/values/input', {
      index: this.state.index
    });

    this.setState({ index: '' })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index</label>
          <input 
            value={this.state.index}
            onChange={event => this.setState({index: event.target.value})}
          />
          <button>Calculate</button>
        </form>
        <h3>Indexes I've seen</h3>
          {this.renderSeenIndexes()}
        <h3>Calculated values</h3>
          {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
