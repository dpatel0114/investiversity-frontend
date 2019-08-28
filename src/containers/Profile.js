import React, { Component } from 'react'
import {  Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
// import { mapStateToProps } from '../components/PortfolioCard';
import { connect } from 'react-redux';

// let user = '';
 
export class Profile extends Component {




  constructor(props){
    super(props)
    this.state = {
      editUser: {

      }
    }
  }


componentDidMount(){
  fetch(`https://investiversity-backend.herokuapp.com/users/${localStorage.uid}`)
  .then(res => res.json())
  .then(data => 
      {this.setState({editUser: data.user})
      console.log(this.state)
      }
    )}

  handleChange = (e) => {
    this.setState({
      editUser: {...this.state.editUser, [e.target.name]: e.target.value}
      // [e.target.name]: e.target.value
    })
  }

   
  updateProfile=(e)=>{
      e.preventDefault()
      let newUser = {
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
        password: e.target.password.value,
        email: e.target.email.value,
        username: e.target.username.value
      }

      fetch(`https://investiversity-backend.herokuapp.com/users/${localStorage.getItem('uid')}`, { 
        method: 'PATCH', 
        body: JSON.stringify({user: newUser}),
        headers: {
          'Access-Token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(data => {console.log(data) 
      this.setState({ editUser: data }) 
    
    }
      )
  }


  render() {
    // console.log("Profile: ", this.props.user.firstname)
    return (
      <div>
     
      <h3 class="text-center text-white" style={{"margin-top":"1%"}}>  Welcome {this.state.editUser.firstname} !</h3>
      <div className=" card container col-md-5 shadow" style={{"margin-top":"2%"}}>
            <h5 className="card-header shadow"> <i class="fas fa-user"></i>&nbsp; Profile</h5>
            <div className="card-body text-left">
             <p className="card-text"> Firstname: &nbsp; &nbsp; {this.state.editUser.firstname} </p>
             <p className="card-text"> Lastname: &nbsp; &nbsp; {this.state.editUser.lastname} </p>
             <p className="card-text"> username: &nbsp; &nbsp; {this.state.editUser.username}</p>
             <p className="card-text"> Email: &nbsp; &nbsp; {this.state.editUser.email} </p>
            
           </div>
         </div>


        <div class="container col-md-5" style={{"margin-top":"2%"}}>
          <Form onSubmit={this.updateProfile} >

                  <Form.Label>First Name:</Form.Label>
                  <Form.Control 
                  onChange={(e) => this.handleChange}
                    name="firstname"
                    placeholder='Firstname'
                    defaultValue={this.state.editUser.firstname}
                    className="shadow"
                    />
                    
                  <Form.Label>Last Name:</Form.Label> 

                  <Form.Control
                   onChange={(e) => this.handleChange}
                  // onChange={this.handleChange}
                    name="lastname"
                    placeholder='Lastname'
                    defaultValue={this.state.editUser.lastname}
                    className="shadow" />

                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                  // onChange={this.handleChange}
                  onChange={(e) => this.handleChange}
                    name="username"
                    placeholder="username" 
                    defaultValue={this.state.editUser.username} 
                    className="shadow"/>

                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                  onChange={(e) => this.handleChange}
                  // onChange={this.handleChange}
                    name="password"
                    placeholder="password" 
                    className="shadow"/>

                  <Form.Label>Email</Form.Label>
                  <Form.Control
                  onChange={(e) => this.handleChange}
                  // onChange={this.handleChange}
                    name="email"
                    placeholder="Email" 
                    defaultValue={this.state.editUser.email}
                    className="shadow"
                    /> <br/>


                <Button variant="primary" type="submit" >
                  Update Profile
                </Button>

              </Form>           
            
      
            </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {

  return { user: state.stock.user }
}
export default withRouter(connect(mapStateToProps)(Profile));