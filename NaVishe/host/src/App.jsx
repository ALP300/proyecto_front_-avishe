import React, { Suspense, lazy } from "react";

// Carga dinámica del componente remoto
const LoginApp = lazy(() => import("mf_login/LoginApp"));

const App = () => {
  return (
    <div>
      <h1>Host App</h1>
      <Suspense fallback={<div>Loading Login...</div>}>
        <LoginApp />
      </Suspense>
    </div>
  );
};

export default App;