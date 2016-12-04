import React, { Component } from 'react'
import { Button, FormControl, InputGroup, Glyphicon, Form } from 'react-bootstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import '../dateRangePicker.css';

class EntriesFilter extends Component {
  render() {
    const startDate = this.props.startDate
    const endDate = this.props.endDate
    const dateRange = `${startDate} - ${endDate}`
    return(
      <div className="row">
        <div className="col-md-3">
          <DateRangePicker startDate={startDate} endDate={endDate} onApply={this.props.onUpdateDateRanges}>
            <InputGroup>
              <FormControl value={dateRange} />
              <InputGroup.Addon>
                <Glyphicon glyph="calendar" />
              </InputGroup.Addon>
            </InputGroup>
          </DateRangePicker>
        </div>
        <div className="col-md-3">
          <Form inline>
            <FormControl type="time" value={this.props.startTime} onChange={this.props.onUpdateStartTime} />
            <FormControl type="time" value={this.props.endTime} onChange={this.props.onUpdateEndTime} />
          </Form>
        </div>
        <Button bsClass="btn btn-default" onClick={this.props.onFilter}>
          Filter <Glyphicon glyph="search" />
        </Button>
        <Button bsClass="btn btn-default" onClick={this.props.onReset}>
          Reset <Glyphicon glyph="repeat" />
        </Button>
      </div>
    )
  }
}

export default EntriesFilter
