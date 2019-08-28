import React, { Component } from 'react';
import { Container, Col, Row, Button, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
// import { Redirect, withRouter, BrowserRouter as Router } from "react-router-dom";
import {handleLogin} from '../actions/stockActions';


class Login extends Component {

 state = {
   username: '',
   password: ''
 }

 handleChange = (e) => {
   this.setState({
     [e.target.name]: e.target.value
   })
 }
  
  
  render() {
    
    return (
      <div>
        <Container style={{width: "30%"}}>
          <Row className="pt-3 pb-5 justify-content-md-center">
            <Col>
              <Form onSubmit={(e) => this.props.handleLogin(e, this.state,this.props.history)} >
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    name="username"  
                    placeholder="username"
                    onChange={this.handleChange} className="shadow"/>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    name="password"
                    placeholder="password" className="shadow"/>
                </Form.Group>

                <Button  variant="primary" type="submit" >
                  Login
                </Button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 

                 <Button  href="/signup"> &nbsp;Sign Up</Button>
          
          
              </Form>

            </Col>
          </Row>
        </Container>
      
      </div>
    )
  }
}

const mapStateToProps =(state)=>{
  return state.stock

}
export default connect(mapStateToProps,{handleLogin})(Login);
