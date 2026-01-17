import { Link } from 'react-router-dom';
import { useStore } from '../store/store';
import { format } from 'date-fns';
import './BlueprintList.css';

export default function BlueprintList() {
  const { blueprints } = useStore();

  return (
    <div className="blueprint-list">
      <div className="blueprint-list-header">
        <h1>Blueprints</h1>
        <Link to="/blueprints/create" className="btn-primary">
          Create Blueprint
        </Link>
      </div>

      {blueprints.length === 0 ? (
        <div className="empty-state">
          <p>No blueprints found. Create your first blueprint to get started.</p>
          <Link to="/blueprints/create" className="btn-primary">
            Create Blueprint
          </Link>
        </div>
      ) : (
        <div className="blueprints-grid">
          {blueprints.map((blueprint) => (
            <div key={blueprint.id} className="blueprint-card">
              <h3>{blueprint.name}</h3>
              <p className="blueprint-meta">
                Created: {format(blueprint.createdAt, 'MMM dd, yyyy')}
              </p>
              <p className="blueprint-fields-count">
                {blueprint.fields.length} field{blueprint.fields.length !== 1 ? 's' : ''}
              </p>
              <div className="blueprint-actions">
                <Link
                  to={`/contracts/create/${blueprint.id}`}
                  className="btn-primary btn-small"
                >
                  Create Contract
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
