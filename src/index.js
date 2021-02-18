import React from 'react';
import ReactDOM from 'react-dom';
import Shell from './components/Shell';
import './styles.css';

// this data should be probagated via the Server, but this works for this example
fetch('./ab-tests-data.json')
  .then((resp) => resp.json())
  .then((abTestData) => {
    ReactDOM.render(<Shell abTestData={abTestData} />, document.getElementById('root'));
  });
