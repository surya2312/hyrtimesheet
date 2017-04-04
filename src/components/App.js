import React, { Component } from 'react';
import SubmitTS from './SubmitTS';
import NavBar from './NavBar';
import uuid from 'uuid';
import './App.css';
import Login from './Login'
import TimeSheets from './TimeSheets';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import moment from 'moment';
import Admin from './Admin'

class App extends Component {
 
constructor(){
  super();
  this.state = {
    timeSheets: [],
    selectedDates: [],
    userName:'',
    showRoleOptions: false,
    userRole:'user'
  }
}

getTimeSheets(){
  this.state = {
    timeSheets: [
      {
        id: uuid.v4(),
        startDate:'02/27/2017',
        endDate: '03/03/2017',
        hours:40,
        status:'Approved'
      },
      {
        id: uuid.v4(),
        startDate:'03/06/2017',
        endDate: '03/10/2017',
        hours:40,
        status:'Pending'
      },
      {
        id: uuid.v4(),
        startDate:'03/13/2017',
        endDate: '03/17/2017',
        hours:40,
        status:'Submitted'
      }
    ]
  }
};

componentWillMount(){
  this.getTimeSheets();
}

componentDidMount(){

}

handleAddTimeSheet(timeSheet){
  let timeSheets = this.state.timeSheets;
  timeSheets.push(timeSheet);
  this.setState({timeSheets:timeSheets});
}

handleDeleteTimeSheet(id){
  let timeSheets = this.state.timeSheets;
  let index = timeSheets.findIndex(x => x.id === id);
  timeSheets.splice(index,1);
  this.setState({timeSheets: timeSheets});
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
    console.log(this.state.userRole);
}
render() {
    let mainScreen  = this.state.showRoleOptions ? 
                              (this.state.userRole === 'user' ? 
                      <SubmitTS addTimeSheet={this.handleAddTimeSheet.bind(this)}
                        addCells={this.loadCells.bind(this)}
                        selectedDates={this.state.selectedDates}/> :<Admin/> ): 
                      <Login loginSuccess={this.handleLogin.bind(this)}/>;
    return (
      <div className="App">
        <NavBar userName={this.state.userName} showRoleOptions={this.state.showRoleOptions} /><br/>
        {mainScreen}
      </div>
    );
  }
}

export default App;

///<TimeSheets timeSheets={this.state.timeSheets} onDelete={this.handleDeleteTimeSheet.bind(this)}/>

/*<SubmitTS addTimeSheet={this.handleAddTimeSheet.bind(this)}
                  addCells={this.loadCells.bind(this)}
                  selectedDates={this.state.selectedDates}/> */