import React, { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
       localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", email);   // 👈 ADD THIS

      alert("Login successful!");
      props.onLogin(); // Notify parent about login

      setEmail("");
      setPassword("");
    }else {
      alert(data.message);
    }
  };

  return (
    <div className="section">
      <h3>Login</h3>

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

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
