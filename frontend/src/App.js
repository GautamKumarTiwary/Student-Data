import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

// ⬇️ Import StudentState
import StudentState from './context/student/StudentState'; // adjust path if needed

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <div className="container">
        <Routes>
          <Route path="/home" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <StudentState> {/* ⬅️ Add this */}
        <Router>
          <AppContent />
        </Router>
      </StudentState>
    </AuthProvider>
  );
}

export default App;
