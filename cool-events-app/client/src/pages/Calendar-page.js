import React, { useState, useRef } from 'react';
import '../App.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";

import events from '../utils/events';

const MyCalendar = () => {
  const [calendarEvents, setCalendarEvents] = useState(events);
  const [showInputBox, setShowInputBox] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const calendarRef = useRef(null);

  const handleButtonClick = () => {
    setShowInputBox(true);
  };

  const handleInputChange = (event) => {
    setEventTitle(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleAddEvent = () => {
    if (eventTitle.trim() !== '' && selectedDate !== null && selectedTime !== null) {
      const dateTimeString = selectedDate.toISOString().split('T')[0] + ' ' + selectedTime;
      const newEvent = {
        title: eventTitle,
        start: dateTimeString,
        allDay: false
      };
      setCalendarEvents([...calendarEvents, newEvent]);
    }
    setShowInputBox(false);
    setEventTitle('');
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <div className="App">
      {showInputBox && (
        <div>
          <input
            type="text"
            value={eventTitle}
            onChange={handleInputChange}
            placeholder="Enter event title"
          />
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText="Select date"
            />
            <TimePicker
              onChange={handleTimeChange}
              value={selectedTime}
              format="HH:mm"
              disableClock={true}
              style={{width: '150px'}}
            />
          </div>
          <button onClick={handleAddEvent}>Add</button>
        </div>
      )}
      <button onClick={handleButtonClick}>Add Event</button>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventColor={'#' + Math.floor(Math.random() * 16777215).toString(16)}
        navLinks={true}
        dayMaxEventRows={3}
        eventMaxStack={3}
      />
    </div>
  );
};

export default MyCalendar;
