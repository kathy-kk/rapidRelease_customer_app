import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import store from './configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Root store = {store}/>, document.getElementById('app'));