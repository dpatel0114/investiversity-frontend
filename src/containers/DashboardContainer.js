import React, { Component } from 'react'
// import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import StockContainer from './StockContainer'
import  PortfolioContainer from './PortfolioContainer'
import BalanceContainer from './BalanceContainer';
import { connect } from 'react-redux';
import {Spring} from 'react-spring/renderprops'




export class DashboardContainer extends Component {

  render() {
 
    return (

    <>

      <div class="alert alert-dismissible alert-success text-center ">
        {/* <button type="button" class="close" data-dismiss="alert">&times;</button> */}
       <h4> Hi! {this.props.firstname}, Welcome to <strong> Investiversity! </strong>   </h4>
      </div>
      
      
      <div class='row' style={{margin: '5px'}}>
        <div class="border col " style={{"margin-right":"1rem"}}> <h3 class="card-header text-center border-bottom" style={{"margin":"2rem"}}> Stocks </h3><StockContainer/></div>

        <div class="border col " style={{"margin-right":"1rem"}}> <h3 class="card-header text-center border-bottom" style={{"margin":"2rem"}}> Portfolio </h3><PortfolioContainer/></div>
        <div class="border col text-center border-bottom">
          
        <Spring
            from={{transform:'scale(0)'}}
            to={{transform:'scale(1)'}}
            >
              {props =>  <div  style={props}> <h3 class="card-header text-center border-bottom" style={{"margin":"2rem"}}> Account </h3><BalanceContainer/></div>}
        </Spring>
          
          
        </div>
      </div>
    
    </>

    )
  }
}

const  mapStateToProps = (state) => {
  return state.stock
}

export default connect(mapStateToProps)(DashboardContainer)
// export default connect()(DashboardContainer)