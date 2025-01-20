import { useState } from "react";
import "./Calendar.css";
import PropTypes from 'prop-types';

const Calendar = ({ appointments, onDayClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const dayAppointments = appointments.filter(
        (appt) => appt.date === dateKey
      );

      days.push(
        <div key={day} className="day" onClick={() => onDayClick(dateKey)}>
          <div>{day}</div>
          {dayAppointments.length > 0 && (
            <div className="badge">{dayAppointments.length}</div>
          )}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (direction) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    );
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      <div className="days">
        <div className="day-name">Sun</div>
        <div className="day-name">Mon</div>
        <div className="day-name">Tue</div>
        <div className="day-name">Wed</div>
        <div className="day-name">Thu</div>
        <div className="day-name">Fri</div>
        <div className="day-name">Sat</div>
        {renderDays()}
      </div>
    </div>
  );
};
Calendar.propTypes = {
    appointments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        clientName: PropTypes.string,
      })
    ).isRequired,
    onDayClick: PropTypes.func.isRequired,
  };
export default Calendar;
