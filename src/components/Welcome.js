import React, { Component } from 'react';
// import { Button, Carousel, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'





export class Welcome extends Component {
  render() {
    return (

      <>
       {window.location.pathname === '/'?
       <div>
          <header className="App-header" >
            <h1> Welcome to Investiversity! </h1>
            <p > Learn about Stocks from University of Investment. </p>
          <div class='row'>
            <Link to='/login' className="btn btn-primary btn-lg btn-primary" >
                Login
            </Link>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            <Link to='/signup' className="btn btn-primary btn-lg btn-primary">
                Sign Up
            </Link> 
          </div>  
          </header>
          </div>
          : 
          null}
          

       </>





  
      
    //    <div className="home">
    //       <Carousel>
    //      <Carousel.Item>
    //         <img className="d-block w-100"
    //               src="holder.js/800x400?text=First slide&bg=373940"
    //               alt="First slide"/>
    //          <Carousel.Caption>
    //           <h3>First slide label</h3>
    //           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    //         </Carousel.Caption>
    //       </Carousel.Item> 
    //       <Carousel.Item>
    //         <img
    //          className="d-block w-100"
    //           src="holder.js/800x400?text=Second slide&bg=282c34"
    //           alt="Third slide"/>
    //         <Carousel.Caption>
    //           <h3>Second slide label</h3>
    //           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //         </Carousel.Caption>
    //       </Carousel.Item>
    //    </Carousel>
    //     <Button className="waves-effect waves-light btn-large" name='login' href='/login' style={{position:"absolute", top: "50%", left:"55%"}}> Login </Button>                   
    //   <Button className="waves-effect waves-light btn-large" name='signup' href='/signup' style={{position:"absolute", top: "50%", left:"40%"}}> Sign Up </Button>   
    //  </div> 


    )
  }
}

export default Welcome;


