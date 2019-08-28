import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Container, Card, CardGroup, CardDeck } from 'react-bootstrap';
// import StockCard from '../components/StockCard';

import PortfolioCard from '../components/PortfolioCard'
import {Spring} from 'react-spring/renderprops'

class  PortfolioContainer extends Component {

  constructor(props){
    super(props)
    this.state ={
      // portfolio:[]
    }
  }

componentDidMount(){
  fetch(`https://investiversity-backend.herokuapp.com/portfolio/my_portfolio/${localStorage.getItem('uid')}`)
  .then(res=> res.json())
  .then(data => {
    // console.log(data)
    // this.setState({
    //   portfolio: data.user.portfolios
    // })
    this.props.dispatch({
      type: 'GET_PORTFOLIO',
      payload: data
    })

  })
}

render(){
  const cards = this.props.portfolio ?
    this.props.portfolio.map(s => s.quantity ? <PortfolioCard eachStock={s}/> : null)
     : null

  
  return (
    <div class=" scrollbar row">
      <table class="table table-striped ">
      {/* <div > */}
      <Spring
      from={{transform:'scale(0)'}}
      to={{transform:'scale(1)'}}
      >
        {props =>  <div style={props}> {cards}</div>}
    </Spring>
    {/* </div> */}
    </table>
    </div>
  )
}}

const  mapStateToProps = (state) => {
    return  state.stock 
}

// export default connectedPortfolioContainer
export default connect(mapStateToProps,)(PortfolioContainer)
// export default PortfolioContainer