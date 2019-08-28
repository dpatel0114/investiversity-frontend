import React, { Component } from 'react'
import { getPortfolio } from '../actions/stockActions';
import { connect } from 'react-redux';
// import 'semantic-ui-css'

export class PortfolioHistory extends Component {

  constructor(props){
    super(props)
    this.state={
      u:{ }
    }
  }

  componentDidMount(){ 
    this.props.getPortfolio()

  }

  render() {
    console.log('hey', this.props)
    return (
      <div> &nbsp;
        <h4 align="center"> { localStorage.firstname }'s Stock's History </h4><br/>
        <div align="center">
        <table class="table table-striped table-bordered table-hover col-md-10" style={{ border: "double"}}>
            <thead class="thead-dark border-bottom" >
              <tr>
                {/* <th>#</th> */}
                <th> Ticker </th>
                <th> Price </th>
                <th> Quantity </th>  
                <th> Total Price </th>
                <th> Bought/Sold </th>

                <th> Date and Time </th>
              </tr>
            </thead>

            <tbody >
              {this.props.porthistory.map(p=> {
                return(
                  <tr class= {p.total_price < 0 ?  "font-weight-bold text-danger text-lg": "font-weight-bold text-success"}>
                  {/* <td>#</td> */}
                  <td>{p.ticker}</td>
                  <td>{p.price}</td>
                  <td>{p.quantity}</td>  
                  <td>{p.total_price}</td>
                  <td><span class={p.total_price < 0 ? "badge badge-pill badge-danger":"badge badge-pill badge-success"}>{p.total_price < 0 ? "Sold":"Bought"}</span></td>
                  <td>{p.created_at}</td>
                </tr>)})}      
            </tbody>

          </table>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {

  return  state.stock 
}

export default connect(mapStateToProps,{getPortfolio})(PortfolioHistory);
