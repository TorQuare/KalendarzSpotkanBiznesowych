import { useEffect, useState } from "react";
import { fetchAppointments, createAppointment } from "../services/api";
import Calendar from "./Calendar";

const ClientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      const data = await fetchAppointments();
      setAppointments(data);
    };
    loadAppointments();
  }, []);

  const handleBook = async () => {
    if (!selectedDate) return;
    const newAppointment = { date: selectedDate, clientName: "John Doe" };
    const savedAppointment = await createAppointment(newAppointment);
    setAppointments((prev) => [...prev, savedAppointment]);
  };

  return (
    <div>
      <h1>Panel Klienta</h1>
      <Calendar
        appointments={appointments}
        onDayClick={(date) => setSelectedDate(date)}
      />
      {selectedDate && (
        <div>
          <p>Rezerwujesz termin: {selectedDate}</p>
          <button onClick={handleBook}>Zarezerwuj</button>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
