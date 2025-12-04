import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import ExecutiveDashboard from './ExecutiveDashboard';
import DivisionDashboard from './DivisionDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import EvidenceUpload from './EvidenceUpload';
import AdminPanel from './AdminPanel';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ExecutiveDashboard" element={<ExecutiveDashboard />} />
        <Route path="/DivisionDashboard" element={<DivisionDashboard />} />
        <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
        <Route path="/upload" element={<EvidenceUpload />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
