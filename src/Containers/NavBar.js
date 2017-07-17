import React, {Component} from 'react';
import {BrowserRouter as Router,Link, Route} from 'react-router-dom';
// import Slick from './Components/Slick'
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
		$.getJSON(window.hostAddress+'/get',(productlinesData)=>{
			// console.log(productlinesData);
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
    		<div className="image-container">
					<img className="img-responsive" alt="Responsive image" src="./images/test2.jpg" />
					<div className="image-text">
						<h2><span>Be kind to yourself...</span></h2>
					
					</div>
				</div>
					<header className="nav-type-1" id="home">
						<nav className="navbar navbar-fixed-top">
							<div className="container-fluid relative">
								<div className="row">
									<div className="navbar-header">
										<button type="button" className="navbar-toggle" data-toggle='collapse' data-target="#navbar-collapse">
											<span className="sr only">Toggle Navigation</span>
											<span className="icon-bar"></span>
											<span className="icon-bar"></span>
											<span className="icon-bar"></span>
										</button>
											<div className="col-md-8 col xs-12 nav wrap">
												<div className="collapse navbar-collapse text-center" id="navbar-collapse">
													<ul className="nav navbar-nav local-scroll text-center">
														<li className="active">
															<a href="#home">Home</a>
															{shopMenu}
														</li>
															<li><a href="#login">Login</a></li>
															<li><a href="#register">Register</a></li>
															<li><a href="#oils">Oils</a></li>
															<li><a href="butters">Butters</a></li>
															<li><a href="#scrubs">Scrubs</a></li>
													</ul>
												</div>
											</div>
								</div>
						</div>	</div>
					</nav>
				</header>
        </div>
        </Router>
	)
  }
}

export default NavBar;