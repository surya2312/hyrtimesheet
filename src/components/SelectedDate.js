import React, { Component } from 'react';


class SelectedDate extends Component {
  render() {
    return (
       <span> {this.props.selectedDate.id}</span>
    );
  }
}

export default SelectedDate;
