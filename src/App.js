import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import NavBar from './Containers/NavBar';
import Home from './Containers/Home';
import Register from './Containers/Register';
import Login from './Containers/Login';
import Slick from './Components/Slick';
import productLine from './Containers/productLine'
class App extends Component {
  render() {
    return (
    	<Router>
	      	<div className="App">
	      		<NavBar />
		         <Route exact path ="/" component={Slick} />
		         	<div className="container main">
		         		<Route exact path="/" component={Home} />
		        		 <Route exact path="/login" component={Login} />
		        		 <Route exact path="/register" component={Register} />
		        		 <Route path="/shop/:productLine" component={productLine} />
		        	</div>
		        </div>
      </Router>
    );
  }
}

export default App;

