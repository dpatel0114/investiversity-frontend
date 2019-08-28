import React, { Component } from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { Redirect, withRouter } from "react-router-dom";
import {handleSignUp} from '../actions/stockActions'



class SignUp extends Component {

   state ={
     
   } 
  

  handleChange=(e)=> {
    this.setState({user: {...this.state.user, [e.target.name]: e.target.value}})
  }

  handleClick =(e)=>{
    this.props.handleSignUp(e)
    this.props.history.push('/login')
  }

  render() {
    return (
      <div>
         <Container style={{width:"50%"}}>
          <Row className="pt-3 pb-5 justify-content-md-center">
            <Col>
              <Form onSubmit={this.handleClick}>
              <Form.Group>
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                  // onChange={this.handleChange}
                    name="firstname"
                    placeholder="First name" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                  // onChange={this.handleChange}
                    name="lastname"
                    placeholder="Last name" />
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                  // onChange={this.handleChange}
                    name="username"
                    placeholder="username" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                  // onChange={this.handleChange}
                    name="password"
                    placeholder="password" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                  // onChange={this.handleChange}
                    name="email"
                    placeholder="Email" />
                </Form.Group>

                <Button variant="primary" type="submit" >
                  Sign Up 
                </Button> &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; 

                <Button  href="/login"> &nbsp;Login</Button>

              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps =(state)=> {
  return state.stock

}

export default connect(mapStateToProps,{handleSignUp})(SignUp)
// export default withRouter(SignUp)
