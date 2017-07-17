import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Containers/Home'
//go get the createStore method from the redux module
import { createStore} from 'redux';
//import the Provider from react-redux so react and redux can talk.
import { Provider} from 'react-redux';
//import root reducer(index.js) so we can give it to the store...fill those shelves!!!
import reducers from './reducers/index';
import Navbar from './Containers/NavBar';



const theStore = createStore(reducers);
//reactdom.render takes 2 args(1. what, 2. where)
ReactDOM.render(
	<Provider store={theStore}>
		<Navbar />
	</Provider>,
 	document.getElementById('root')
 );

