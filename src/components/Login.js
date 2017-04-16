import React, { Component } from 'react';
import { Container, Tooltip , Alert, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './App.css';
import Request from 'superagent';


class Login extends Component {
  constructor(){
    super();
    this.state = {
      showInvalidAlert: false
    }
    
  }

  handleSubmit(e){
    var user = {
      email:this.email.value,
      password:this.password.value
    };
    
    Request
      .put('https://hyrtimesheetapi.herokuapp.com/api/checkuser')
      .set('Content-Type', 'application/json')
      .send(user)
       .end((error, res) => {
                res.text === "null" ? 
                this.showAlert() : 
                this.redirectToScreen(JSON.parse(res.text));
      });
  
    e.preventDefault();
  }

 
  redirectToScreen(user){
     this.props.loginSuccess(user);  
  }
  
  showAlert(){
    this.setState({showInvalidAlert:true});
  }
  onDismiss(){
    this.setState({showInvalidAlert:false});
  }

  render() {
    return (
     <div className="Login">
  <Container>
    <Row>
      <Col lg={{ size: 6, push: 2, pull: 2, offset: 1 }}>
      <div className="login-div">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup row>
            <Col lg={12}>
            <center>
              <h2 className="form-signin-heading">Login</h2>
            </center>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg={12}>
            
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg={12}>
            <Input type="email" name="email" 
              getRef={(input) => (this.email = input)}
              id="email" placeholder="Email" required />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg={12}>
            <Input type="password" name="password"
               getRef={(input) => (this.password = input)}
               id="password" placeholder="password" required />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg={12}>
            <button onClick={this.handleSubmit.bind(this)} className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg={12}>
                <Alert color="danger" isOpen={this.state.showInvalidAlert} 
                    toggle={this.onDismiss.bind(this)}>
                  <strong>Oh snap!</strong> Invalid Email/password combination.
                </Alert>
            </Col>
          </FormGroup>
        </Form>
      </div>
      </Col>
    </Row>
  </Container>
</div>
    );
  }
}

export default Login;
