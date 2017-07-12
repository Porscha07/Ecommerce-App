import React, {Component} from 'react';
import {BrowserRouter as Router,Link, Route} from 'react-router-dom';
import Slick from './Slick'
import $ from 'jquery'

class NavBar extends Component{
	constructor(props) {
		super(props);
		this.state = {
			productlines:[]
		}
	}
	componentDidMount() {
		// go get all productlines from the database
		$.getJSON(window.hostAddress+'/productLine/get',(productlinesData)=>{
			console.log(productlinesData);
			this.setState({
				productlines : productlinesData
			})
		})
	}
  render(){
  	console.log(this.state.productlines)
  	//temp var to store our <link>
  	const shopMenu = [];
  	//map through this.state.productlines
  	this.state.productlines.map((pl,index)=>{
  		shopMenu.push(
  			<Link key={index} to={`/shop/${pl.id}`}>{pl.productLine}</Link>
  		)
  	})

    return(
    	<Router>
    	<div>
			<nav className="navbar navbar-default navbar-fixed-top">
			  <div className="container-fluid navbar-white">
			    <ul className="nav navbar-nav">
			    	<li><Link className="nav2-color"to="/">Home</Link></li>
			      	<li className="dropdown">
			      		<Link className="nav2-color" to="/shop"><i className="arrow down" /> Shop</Link>
			      	<ul>
			      		<li className="dropdown-links">
			      			{shopMenu}
			      		</li>
			      	</ul>
			      	</li>
			      	<li><Link className="nav2-color"to="/about">About Us</Link></li>
			      	<li><Link className="nav2-color"to="/contact">Contact Us</Link></li>
			    </ul>
			  </div>
			  <div className="container">
			    <div className="navbar-header">
			    	<Link to="/" className="navbar-brand">Ecommerce App</Link>
			    </div>
				   <ul className="nav navbar-nav float-right test">
				      <li className="text-right "><Link className="nav-color" to="/login">Login</Link></li>
				      <li className="text-right "><Link className="nav-color"to="/register">Register</Link></li>
				      <li className="text-right "><Link className="nav-color"to="/cart">(0) items in your cart | ($0.00)</Link></li>
				   </ul>
			  </div>
			</nav>
	        <Route exact path="/" component={Slick} />
        </div>
        </Router>
	)
  }
}

export default NavBar;