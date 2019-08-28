import React, { Component } from 'react'
import { Container, Card, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux'

export class SearchContainer extends Component {
  
  render() {
    const bestStocks = this.props.bestMatches.map( s=> 
    {return (<Col><Card style={{width:'150px', height: '150px'}}>
      <Card.Body >
        <Card.Title>{s["1. symbol"]} </Card.Title>
        <Card.Text> {s["2. name"]}</Card.Text>
        <Button> Info </Button>
       </Card.Body>
    </Card> </Col>)
    }
    )
    return (
      <div>
        <Container>
          <Row>
          
          {bestStocks}
          </Row>
        </Container>
      
      </div>
    )
  }
}

function mapStateToProps(state){

  return state.stock
}

export default connect(mapStateToProps)(SearchContainer)
