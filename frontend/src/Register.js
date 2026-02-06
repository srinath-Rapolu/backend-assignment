import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async () => {

    const res = await fetch("http://localhost:5000/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();
    alert(data.message);

    // clear fields
    setEmail("");
    setPassword("");
    setRole("user");
  };

  return (
    <div className="section">
      <h3>Register</h3>

      <input 
        value={email}
        placeholder="Email" 
        onChange={e => setEmail(e.target.value)} 
      />

      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
