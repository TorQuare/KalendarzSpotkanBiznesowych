const API_BASE_URL = "https://api.example.com";

export const fetchAppointments = async () => {
  const response = await fetch(`${API_BASE_URL}/appointments`);
  return response.json();
};

export const createAppointment = async (appointment) => {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointment),
  });
  return response.json();
};

export const deleteAppointment = async (id) => {
  const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
