import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/store';
import { FilterStatus, ContractStatus } from '../types';
import { STATUS_LABELS, STATUS_COLORS, getFilterStatus } from '../utils/contractLifecycle';
import { format } from 'date-fns';
import './Dashboard.css';

export default function Dashboard() {
  const { contracts } = useStore();
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredContracts = useMemo(() => {
    if (filter === 'all') {
      return contracts;
    }
    return contracts.filter((contract) => getFilterStatus(contract.status) === filter);
  }, [contracts, filter]);

  const stats = useMemo(() => {
    return {
      total: contracts.length,
      active: contracts.filter((c) => getFilterStatus(c.status) === 'active').length,
      pending: contracts.filter((c) => getFilterStatus(c.status) === 'pending').length,
      signed: contracts.filter((c) => getFilterStatus(c.status) === 'signed').length,
    };
  }, [contracts]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Contract Dashboard</h1>
          <p className="dashboard-subtitle">Manage and track all your contracts</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon">📄</div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Contracts</div>
          </div>
        </div>
        <div className="stat-card stat-card-success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{stats.active}</div>
            <div className="stat-label">Active</div>
          </div>
        </div>
        <div className="stat-card stat-card-warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
        <div className="stat-card stat-card-info">
          <div className="stat-icon">✍️</div>
          <div className="stat-content">
            <div className="stat-value">{stats.signed}</div>
            <div className="stat-label">Signed</div>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h2>Filter Contracts</h2>
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All ({stats.total})
          </button>
          <button
            className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('active')}
          >
            Active ({stats.active})
          </button>
          <button
            className={filter === 'pending' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('pending')}
          >
            Pending ({stats.pending})
          </button>
          <button
            className={filter === 'signed' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('signed')}
          >
            Signed ({stats.signed})
          </button>
        </div>
      </div>

      {filteredContracts.length === 0 ? (
        <div className="empty-state">
          <p>No contracts found. Create a contract from a blueprint to get started.</p>
          <Link to="/blueprints" className="btn-primary">
            View Blueprints
          </Link>
        </div>
      ) : (
        <div className="contracts-table-container">
          <table className="contracts-table">
            <thead>
              <tr>
                <th>Contract Name</th>
                <th>Blueprint Name</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id}>
                  <td>{contract.name}</td>
                  <td>{contract.blueprintName}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: STATUS_COLORS[contract.status] }}
                    >
                      {STATUS_LABELS[contract.status]}
                    </span>
                  </td>
                  <td>{format(contract.createdAt, 'MMM dd, yyyy')}</td>
                  <td>
                    <Link to={`/contracts/${contract.id}`} className="btn-link">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
