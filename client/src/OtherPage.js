import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default () => {
  return (
    <div className="App">
      Some other page!
      <Link to="/">
        Go Home!
      </Link>
    </div>
  );
}
