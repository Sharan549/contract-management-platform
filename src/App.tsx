import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { StoreProvider } from './store/store';
import Dashboard from './pages/Dashboard';
import BlueprintList from './pages/BlueprintList';
import BlueprintCreate from './pages/BlueprintCreate';
import ContractCreate from './pages/ContractCreate';
import ContractDetail from './pages/ContractDetail';
import './App.css';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="app">
          <nav className="navbar">
            <div className="nav-container">
              <Link to="/" className="nav-logo">
                <span className="logo-text">EURUSYS</span>
                <span className="logo-subtitle">Contract Management Platform</span>
              </Link>
              <div className="nav-links">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/blueprints" className="nav-link">
                  Blueprints
                </Link>
              </div>
            </div>
          </nav>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/blueprints" element={<BlueprintList />} />
              <Route path="/blueprints/create" element={<BlueprintCreate />} />
              <Route path="/contracts/create/:blueprintId" element={<ContractCreate />} />
              <Route path="/contracts/:id" element={<ContractDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
