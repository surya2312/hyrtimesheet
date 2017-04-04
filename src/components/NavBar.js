import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class NavBar extends Component {
 
constructor(){
  super();
  this.state = {
   
  }
}

render() {
    
    return (
      <div className="NavBar">
      <div className="nav-border">
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">
            <img src="https://files.slack.com/files-pri/T2JBNBZ1Q-F4MQM9YQM/hyr-full-name.png" height="50" />
            {this.props.userName}
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            {this.props.showRoleOptions &&
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#">Settings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Logout</NavLink>
              </NavItem>
            </Nav>
            }
            
          </Collapse>
        </Navbar>
        </div>
      </div>
    );
  }
}

export default NavBar;