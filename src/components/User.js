import React, { Component } from 'react';
import uuid from 'uuid';
import {  Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert ,Table, Label, Form, FormGroup, Button, Input, Container, Row, Col, InputGroup, InputGroupButton, InputGroupAddon } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SelectedDate from './SelectedDate';

class User extends Component {
  constructor(){
    super();
    this.state = {
      startDate: moment(),
      endDate: moment(),
      newTimeSheet:{},
      showDateWarning: false,
      dropdownOpen: false,
      dateRanges:{},
      totalHours: 0
    }
    this.toggle = this.toggle.bind(this);
    this.selectedDates =[];
    
  }
  componentWillMount(){
    let dateRanges= {
        startOfMonth :moment().startOf('month').format('MM/DD/YY'),
        midOfMonth : moment().startOf('month').add(15, 'days').format('MM/DD/YY'),
        midPlusOfMonth : moment().startOf('month').add(16, 'days').format('MM/DD/YY'),
        endOfMonth : moment().endOf('month').format('MM/DD/YY')
    }
    let sofm = moment().startOf('month').format('MM/DD/YY');
    let curdate = moment().format('MM/DD/YY');
    let eofm = moment().endOf('month').format('MM/DD/YY');
    this.setState({dateRanges:dateRanges});
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  selectedRange(sD, eD){
    let startDate = moment(sD);
    let endDate = moment(eD);
   
       var dates = [],
            end = endDate,
            diff = endDate.add(1,'d').diff(startDate, 'days');

        for(let i = 0; i < diff; i++) {
            let currentDate = moment(end.subtract(1,'d').format('MM/DD/YYYY'));
            dates.push({
                date:new Date(moment(currentDate.format('MM/DD')).toISOString()),
                displayDate:currentDate.format('MM/DD'),
                          day:currentDate.format('ddd'),
                          hours:'0',
                          id:uuid.v4()}
              );
        }
         this.props.addCells(dates.reverse());  
        
    
  }


  LoadCells(e){
    if(this.state.startDate.isBefore(this.state.endDate) ||
        this.state.startDate.isSame(this.state.endDate)){
         var totalDays = this.state.endDate.diff(this.state.startDate, 'days');
         var results = this.enumerateDaysBetweenDates(this.state.startDate, this.state.endDate);
         this.props.addCells(results);  
    } else{
      
      this.state.showDateWarning = true;
      
      alert('End Date Error');
    }
    e.preventDefault();
  }

 
  submitData(){
    this.props.submitTimesheets(this.props.selectedDates);
  }

 
  updateHours(id, e){
    var totalHours = 0;
    for (var item in this.props.selectedDates) {
       if(this.props.selectedDates[item].id === id){
         this.props.selectedDates[item].hours = e.target.value;
       }
       totalHours += parseInt(this.props.selectedDates[item].hours);
    }
      this.setState({totalHours:totalHours});
  }
   
  render() {
    
    if(this.props.selectedDates){
      
      this.selectedDates = this.props.selectedDates.map(selectedDate =>{
        return(
          <tr key={selectedDate.date}>
            <td>
              {selectedDate.displayDate}<br/>{selectedDate.day}
            </td>
            <td>
               <input type="text"  size="4"
               defaultValue={selectedDate.hours} onChange={this.updateHours.bind(this, selectedDate.id)} />
            </td>
          </tr>    
        );
      });
    }

    return (
      <div >
        <div className="container-div">
          <div>
            <Container>
            <Row>
            <Col lg={{ size: 4}}>
                  <span className="user-name">Surya Nedunuri</span>
              </Col>
              <Col lg={{ size: 6 }}>
                 <label >Weeks of Month:</label>  
                <Dropdown group isOpen={this.state.dropdownOpen}  toggle={this.toggle}>
                  <DropdownToggle caret>
                    Select Range
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.selectedRange.bind(this, this.state.dateRanges.startOfMonth, this.state.dateRanges.midOfMonth)}>
                      <b>{this.state.dateRanges.startOfMonth} - {this.state.dateRanges.midOfMonth}</b>
                    </DropdownItem>
                    <DropdownItem onClick={this.selectedRange.bind(this, this.state.dateRanges.midPlusOfMonth, this.state.dateRanges.endOfMonth)}>
                      <b>{this.state.dateRanges.midPlusOfMonth} - {this.state.dateRanges.endOfMonth}</b>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
            </Container>
          </div>
          <hr className="my-2" />
          {this.selectedDates.length > 0 &&
            <div>
            <Row>
              <Col lg={{ size: 12}}>
              <div className="centerBlock">
              <Table className="dates-table" hover>
                <tbody>
                <tr>
                  <th><br/>Date</th>
                  <th>#Hours</th>
                </tr>
                {this.selectedDates}
                
                </tbody>
              </Table>
              </div>
            </Col>
            </Row>
            <Row>
              <Col lg="12">
                <div className="centerBlock">
                   <Table className="dates-table" hover>
                   <tbody>
                     <tr >
                  <td colSpan="2">
                      <span>Comments</span>
                      <Input type="textarea" className="comment-box" rows="3" name="comments" id="comments" />
                  </td> 
                </tr>
                <tr >
                  <td>
                      <br/>
                      <span>Total Hours:{this.state.totalHours}</span>
                  </td> 
                  <td>   
                    
                    <Button color="primary" onClick={this.submitData.bind(this)}>Submit</Button>
                  </td> 
                </tr>
                </tbody>
                   </Table>
                </div>
              </Col>
            </Row>
            </div>
          }
        </div>
      </div>
    );
  }
}


User.propTypes = {
  status: React.PropTypes.array,
  addTask: React.PropTypes.func
}

export default User;
