import { useState } from "react";
import OwnerDashboard from "./components/OwnerDashboard";
import ClientDashboard from "./components/ClientDashboard";

const App = () => {
  const [role, setRole] = useState("client"); // Możesz zmieniać na "owner" lub "client"

  return (
    <div>
      <header>
        <button onClick={() => setRole("client")}>Panel Klienta</button>
        <button onClick={() => setRole("owner")}>Panel Właściciela</button>
      </header>
      {role === "owner" ? <OwnerDashboard /> : <ClientDashboard />}
    </div>
  );
};

export default App;
