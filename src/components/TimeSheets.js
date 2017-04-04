import React, { Component } from 'react';
import { Table , ListGroup, Badge, Container, Row, Col } from 'reactstrap';
import TimeSheet from './TimeSheet';
import './App.css';

class TimeSheets extends Component {
  deleteTimeSheet(id){
    this.props.onDelete(id);
  }
  render() {
    let timeSheets;
    if(this.props.timeSheets){
      timeSheets = this.props.timeSheets.map(timeSheet =>{
        return(
          <TimeSheet key={timeSheet.id} onDelete={this.deleteTimeSheet.bind(this)} timeSheets={timeSheet}/>        
        );
      });
    }
    
    return (
      <div className="Tasks">
        <hr className="my-2" />
        <div className="center-div"><br/>
          <Container>
            <Row>
              <Col>
                <Table hover>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Hours</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {timeSheets}
        </tbody>
      </Table>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

TimeSheets.propTypes = {
  timeSheets: React.PropTypes.array,
  onDelete: React.PropTypes.func
}
export default TimeSheets;
