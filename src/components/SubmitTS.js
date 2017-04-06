import React, { Component } from 'react';
import uuid from 'uuid';
import { Alert ,Table, Label, Form, FormGroup, Button, Input, Container, Row, Col, InputGroup, InputGroupButton, InputGroupAddon } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SelectedDate from './SelectedDate';

class SubmitTS extends Component {
  constructor(){
    super();
    this.state = {
      startDate: moment(),
      endDate: moment(),
      newTimeSheet:{},
      showDateWarning: false
    }
    this.selectedDates =[];
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
  }

  setStartDate(startDate) {
    this.setState({startDate:startDate});
  }
  setEndDate(endDate) {
    this.setState({endDate:endDate});
  }

  LoadCells(e){
    if(this.state.startDate.isBefore(this.state.endDate) ||
        this.state.startDate.isSame(this.state.endDate)){
         var totalDays = this.state.endDate.diff(this.state.startDate, 'days');
         var results = this.enumerateDaysBetweenDates(this.state.startDate, this.state.endDate);
         this.props.addCells(results);  
    } else{
      
      this.state.showDateWarning = true;
      console.log(this.state.showDateWarning );
      alert('End Date Error');
    }
    e.preventDefault();
  }

  enumerateDaysBetweenDates (startDate, endDate) {
      var now = startDate.clone(), dates = [];
      var i=1;
      while (now.isBefore(endDate) || now.isSame(endDate)) {
        
            dates.push({  date:now.format('MM/DD/YY'),
                          day:now.format('dddd'),
                          week:now.week(),
                          hours:'0',
                          id:i});
            now.add('days', 1);
            i++;
      }
      return dates;
  };

  submitData(){
    this.props.submitTimesheets(this.props.selectedDates);
  }

  updateHours(id, e){
    for (var item in this.props.selectedDates) {
       if(this.props.selectedDates[item].id === id){
         this.props.selectedDates[item].hours = e.target.value;
       }
    }
  }

  handleSubmit(e){
    if(this.startDate.value === ''){
      alert('Start Date is required');
    } else if(this.endDate.value === ''){
      alert('End Date is required');
    } else if(this.hours.value === ''){
      alert('Number of hours required');
    } else{
      this.setState({
        newTimeSheet :{
          id: uuid.v4(),
          startDate:this.startDate.value,
          endDate: this.endDate.value,
          hours:this.hours.value,
          status:'Submitted'
        }}, function(){
          this.props.addTimeSheet(this.state.newTimeSheet);
        });
    }
    e.preventDefault();
  }
   
  render() {
    
    if(this.props.selectedDates){
      this.selectedDates = this.props.selectedDates.map(selectedDate =>{
        return(
          <tr key={selectedDate.date}>
            <td>
              {selectedDate.date}<br/>{selectedDate.day}
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
              <Col lg={{ size: 6, push: 2, pull: 2, offset: 1 }}>
                
                  <Row>
                    <Col lg="4">
                      <DatePicker className="my-date-picker" selected={this.state.startDate}
                        onChange={this.setStartDate} />
                    </Col>
                    <Col lg="4">
                      <DatePicker className="my-date-picker" selected={this.state.endDate}
                        onChange={this.setEndDate} />
                    </Col>
                    <Col lg="2">
                      <Button color="primary" className="load-button" 
                        onClick={this.LoadCells.bind(this)}>Load Cells</Button>
                    </Col>
                  </Row>
              </Col>
           
            </Row>
            </Container>
          </div>
          <hr className="my-2" />
          {this.selectedDates.length > 0 &&
            <div>
              <Table hover>
                <tbody>
                <tr>
                  <th><br/>Date</th>
                  <th>#Hours</th>
                </tr>
                {this.selectedDates}
                <tr >
                  <td colSpan="2">
                      <span>Comments</span>
                      <Input type="textarea" className="comment-box" rows="3" name="comments" id="comments" />
                  </td> 
                </tr>
                </tbody>
              </Table>

              <Button color="primary" onClick={this.submitData.bind(this)}>Submit</Button>
            </div>
          }
        </div>
      </div>
    );
  }
}


SubmitTS.propTypes = {
  status: React.PropTypes.array,
  addTask: React.PropTypes.func
}

export default SubmitTS;

//<SelectedDate key={selectedDate.id} selectedDate={selectedDate}/>