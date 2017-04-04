import React, { Component } from 'react';
import {Table, Badge } from 'reactstrap';

class TimeSheet extends Component {
  deleteTimeSheet(timeSheet){
    if(timeSheet.status==='Approved'){
      alert('You can not recall timesheets with status Approved');
    }else{
      this.props.onDelete(timeSheet.id);
    }
  }
  render() {
    return (
       
        <tr>
            <td>{this.props.timeSheets.startDate}</td>
            <td>{this.props.timeSheets.endDate}</td>
            <td>{this.props.timeSheets.hours}</td>
            <td>{this.props.timeSheets.status}</td>
            <td> <h5><Badge color="danger" onClick={this.deleteTimeSheet.bind(this, this.props.timeSheets)}>Recall</Badge></h5></td>
          </tr>
    );
  }
}


TimeSheet.propTypes = {
  timeSheet: React.PropTypes.object,
  onDelete: React.PropTypes.func
}
export default TimeSheet;
