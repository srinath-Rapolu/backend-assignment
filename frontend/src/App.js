// import React from "react";
// import Register from "./Register";
// import Login from "./Login";
// import Dashboard from "./Dashboard";
// import "./styles.css";


// function App() {
//   return (
//     <div className="app-container">
//       <h2>Backend Assignment UI</h2>

//       <Register />
//       <hr />
//       <Login />
//       <hr />
//       <Dashboard />
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import "./styles.css";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <div className="app-container">
      <h2>Backend Assignment UI</h2>

      {!isLoggedIn && (
        <>
          <Register />
          <hr />
          <Login onLogin={() => setIsLoggedIn(true)} />
        </>
      )}

      {isLoggedIn && <Dashboard onLogout={() => setIsLoggedIn(false)} />}
    </div>
  );
}

export default App;
