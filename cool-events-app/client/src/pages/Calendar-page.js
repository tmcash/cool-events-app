import React from 'react';
import "../App.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import events from "../utils/events";

export default function App() {
    return (
        <div className="App">
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          themeSystem="Simplex"
          plugins={[dayGridPlugin]}
          events={events}
        />
        <FullCalendar
          defaultView="dayGridMonth"
        
          plugins={[dayGridPlugin]}
          events={events}
          displayEventEnd="true"
          eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
        />
      </div>     
    );
}