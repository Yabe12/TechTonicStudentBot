// src/App.tsx
import React from 'react';


import Sidebar from '../src/components/Sidebar';

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Main Content Goes Here */}
        <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
      </div>
    </div>
  );
};

export default App;
