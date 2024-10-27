
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Adjust the import based on your folder structure
import Students from './components/students'; // Your actual pages/components
import Members from './components/Members';

import Dashboard from './components/Dashboard';
import Attendance from './components/Attendance';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/students" element={<Students />} />
            <Route path="/members" element={<Members />} />
         
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            {/* Add more routes as necessary */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
