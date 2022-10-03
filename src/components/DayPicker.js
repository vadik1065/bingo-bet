import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import '../css/daypicker.css';
import moment from 'moment';
import { formatDate, parseDate } from 'react-day-picker/moment';
import i18next from "i18next";

export default class Daypicker extends React.Component{
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: this.props.propFrom,
      to: this.props.propTo,
      transactions: [],
      totalLength: [],
      showFrom: 0,
      count: 0
    };
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.period !== 'period') {
      if (nextProps.period === 'day') {
        this.setState({ from: new Date(moment().subtract(1, 'days')) });
      };
      if (nextProps.period === 'week') {
        this.setState({ from: new Date(moment().subtract(7, 'days')) });
      };
      if (nextProps.period === 'month') {
        this.setState({ from: new Date(moment().subtract(31, 'days')) });
      };
      if (nextProps.period === 'quarter') {
        this.setState({ from: new Date(moment().subtract(120, 'days')) });
      };
      if (nextProps.period === 'year') {
        this.setState({ from: new Date(moment().subtract(365, 'days')) });
      };
    }
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    this.setState({ from });
    this.props.setPropFrom(from);
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    this.props.setPropTo(to);
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const modifiersStyles = {
      birthday: {
        color: 'white',
        backgroundColor: '#ffc107',
      },
      thursdays: {
        color: '#ffc107',
        backgroundColor: '#fffdee',
      },
    };

    return (
      <div className='daypicker-container flex'>
        <div className="InputFromTo flex">
          <span className="input-title">{i18next.t('From')}</span>
          <DayPickerInput
            value={from}
            placeholder={i18next.t('From')}
            format="LL"
            modifiersStyles={modifiersStyles}
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { after: to },
              toMonth: to,
              modifiers,
              numberOfMonths: 2,
              onDayClick: () => this.to.getInput().focus(),
            }}
            onDayChange={this.handleFromChange}
          />
        </div>
        <span className="InputFromTo-to flex">
          <span className="input-title">{i18next.t('To')}</span>
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            placeholder={i18next.t('To')}
            format="LL"
            modifiersStyles={modifiersStyles}
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
            }}
            onDayChange={this.handleToChange}
          />
        </span>
      </div>
    );
  }
};
