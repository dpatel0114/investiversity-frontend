import React, { Component }from 'react';
// import { Nav, Navbar, Form, FormControl, Button, MDBIcon } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { searchStock, handleLogout} from '../actions/stockActions';
// import { GoSearch } from 'react-icons/lib/go/search';

// import Suggestions from '../components/Suggestions';


class NavBar extends Component{

  render(){
  return (

    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow" style={{height:'70px', fontSize:"1.1rem"}}>
      {/* <img src="../../public/logo2.png" style={{ height: '30px', width: '30px' }}></img> */}
    {localStorage.token ? 
    
    <a class="navbar-brand" href="/dashboard" style={{fontSize:"2.0rem"}}>Investiversity</a>  :     
    <a class="navbar-brand" href="/" style={{fontSize:"2.0rem"}}>Investiversity</a> 

      // <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
      //   <span class="navbar-toggler-icon"></span>
      // </button>
      }

      <div class="collapse navbar-collapse" id="navbarColor03">
        <ul class="navbar-nav mr-auto">
          {localStorage.token ? 
            <li class="nav-item active">
              <a class="nav-link" href="/dashboard"> <i class="fas fa-home"></i>&nbsp;Home <span class="sr-only">(current)</span></a>
          </li> : null}

          {localStorage.token ?
          <li class="nav-item active">
            <a class="nav-link" href="/acchistory">History</a>
          </li>:
          null}&nbsp; 

          <li class="nav-item active">
            <a class="nav-link" href="/about">About</a>
          </li> &nbsp;

          {localStorage.token ?
          <li class="nav-item active ">
            <a class="nav-link" href="/profile"> <i class="fas fa-user"></i>&nbsp;Profile</a>
          </li>
          :null} &nbsp;

          {this.props.logged || localStorage.getItem("token") !== null ?
          <li class="nav-item active ">
            <a class="nav-link" href="/" onClick={(e)=>this.props.handleLogout(e, this.props.history)}> <i class="fas fa-sign-out-alt"></i>&nbsp;Logout</a>
          </li>
          :
          null}
      </ul>
            {localStorage.token ? 
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search"/>
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form> 
        : null}
        
      </div>
    </nav>
        
  )
}
}

function mapStateToProps(state){
  return state.stock 

}

export default connect(mapStateToProps, {searchStock, handleLogout})(NavBar);

