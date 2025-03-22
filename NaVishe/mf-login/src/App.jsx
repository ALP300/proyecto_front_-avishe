import React, { useEffect, useRef } from 'react';

const App = () => {
  const loginRef = useRef(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    import('mf-login/mf-login').then(({ mount }) => {
      mount(loginRef.current);
    });

    import('mf-dashboard/mf-dashboard').then(({ mount }) => {
      mount(dashboardRef.current);
    });
  }, []);

  return (
    <div>
      <h1>Host Application</h1>
      <div ref={loginRef} id="mf-login"></div>
      <div ref={dashboardRef} id="mf-dashboard"></div>
    </div>
  );
};

export default App;