import React, { Component } from 'react';
import User from './User';
import NavBar from './NavBar';
import uuid from 'uuid';
import './App.css';
import Login from './Login'
import TimeSheets from './TimeSheets';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import moment from 'moment';
import Admin from './Admin';
import Request from 'superagent';

class App extends Component {
 
constructor(){
  super();
  this.state = {
    selectedDates: [],  
    userInfo:{}
  }
}


handleAddTimesheets(data){
  var req ={
    "userId":this.state.userInfo._id,
    "timesheets":data
  }
  Request
    .put('http://localhost:3000/api/updateTimesheets')
    .set('Content-Type', 'application/json')
    .send(req)
    .end((error, res) => {
      res ? 
        console.log(res) : 
        console.log('there is error');
  });    
}

loadCells(dates){
  this.setState({selectedDates:dates});
}

handleLogin(user){
  this.setState({userInfo:user});
}

handleLogout(){
  this.setState({userInfo:''});
}

render() {
    let mainScreen  = this.state.userInfo.role ? 
                              (this.state.userInfo.role === 'user' ? 
                      <User userInfo={this.state.userInfo} submitTimesheets={this.handleAddTimesheets.bind(this)}
                        addCells={this.loadCells.bind(this)}
                        selectedDates={this.state.selectedDates}/> :<Admin/> ): 
                      <Login loginSuccess={this.handleLogin.bind(this)}/>;
    return (
      <div className="App">
        <NavBar userInfo={this.state.userInfo}              
                logout={this.handleLogout.bind(this)}/><br/>
        {mainScreen}
      </div>
    );
  }
}

export default App;
