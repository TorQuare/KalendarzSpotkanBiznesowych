import { useEffect, useState } from "react";
import { fetchAppointments, deleteAppointment } from "../services/api";
import Calendar from "./Calendar";

const OwnerDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      const data = await fetchAppointments();
      setAppointments(data);
    };
    loadAppointments();
  }, []);

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
  };

  return (
    <div>
      <h1>Panel Właściciela</h1>
      <Calendar appointments={appointments} onDayClick={() => {}} />
      <div className="appointment-list">
        <h2>Zaplanowane spotkania:</h2>
        <ul>
          {appointments.map((appt) => (
            <li key={appt.id}>
              {appt.date}: {appt.clientName}{" "}
              <button onClick={() => handleDelete(appt.id)}>Usuń</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OwnerDashboard;
