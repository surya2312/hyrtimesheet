import React, { Component } from 'react';
import SubmitTS from './SubmitTS';
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
    timeSheets: [],
    selectedDates: [],
    userName:'',
    showRoleOptions: false,
    userRole:'user',
    userId: ''
  }
}

componentWillMount(){
  
}

componentDidMount(){

}


handleAddTimesheets(data){
  console.log(this.state.userId);
  console.log(data);
  var req ={
    "userId":this.state.userId,
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
  console.log(dates);
  this.setState({selectedDates:dates});
}

handleLogin(user){
    console.log(user);
    this.setState({userName: user.firstName+' '+user.lastName});
    this.setState({showRoleOptions: true});
    this.setState({userRole: user.role});
    this.setState({userId: user._id});
  
}

handleLogout(){
    this.setState({userName: ''});
    this.setState({showRoleOptions: false});
    this.setState({userRole: 'user'});
}

render() {
    let mainScreen  = this.state.showRoleOptions ? 
                              (this.state.userRole === 'user' ? 
                      <SubmitTS submitTimesheets={this.handleAddTimesheets.bind(this)}
                        addCells={this.loadCells.bind(this)}
                        selectedDates={this.state.selectedDates}/> :<Admin/> ): 
                      <Login loginSuccess={this.handleLogin.bind(this)}/>;
    return (
      <div className="App">
        <NavBar userName={this.state.userName} 
                showRoleOptions={this.state.showRoleOptions} 
                logout={this.handleLogout.bind(this)}/><br/>
        {mainScreen}
      </div>
    );
  }
}

export default App;
