import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { ContractStatus } from '../types';
import {
  STATUS_LABELS,
  STATUS_COLORS,
  canTransitionTo,
  getNextStatus,
} from '../utils/contractLifecycle';
import { format } from 'date-fns';
import './ContractDetail.css';

export default function ContractDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contracts, updateContract, getBlueprint } = useStore();

  const contract = contracts.find((c) => c.id === id);
  const blueprint = contract ? getBlueprint(contract.blueprintId) : undefined;

  if (!contract || !blueprint) {
    return (
      <div className="contract-detail">
        <p>Contract not found</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const isLocked = contract.status === 'locked';
  const isRevoked = contract.status === 'revoked';

  const handleStatusChange = (newStatus: ContractStatus) => {
    if (!canTransitionTo(contract.status, newStatus)) {
      alert('Invalid status transition');
      return;
    }
    updateContract(contract.id, { status: newStatus });
  };

  const nextStatus = getNextStatus(contract.status);

  return (
    <div className="contract-detail">
      <div className="page-header">
        <h1>{contract.name}</h1>
        <button onClick={() => navigate('/')} className="btn-secondary">
          Back to Dashboard
        </button>
      </div>

      <div className="contract-info">
        <div className="info-section">
          <h2>Contract Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Blueprint:</span>
              <span className="info-value">{contract.blueprintName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span
                className="status-badge"
                style={{ backgroundColor: STATUS_COLORS[contract.status] }}
              >
                {STATUS_LABELS[contract.status]}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Created:</span>
              <span className="info-value">{format(contract.createdAt, 'MMM dd, yyyy HH:mm')}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Updated:</span>
              <span className="info-value">
                {format(contract.updatedAt, 'MMM dd, yyyy HH:mm')}
              </span>
            </div>
          </div>
        </div>

        {!isLocked && !isRevoked && (
          <div className="lifecycle-section">
            <h2>Contract Lifecycle</h2>
            <div className="lifecycle-actions">
              {nextStatus && (
                <button
                  onClick={() => handleStatusChange(nextStatus)}
                  className="btn-primary"
                >
                  Move to {STATUS_LABELS[nextStatus]}
                </button>
              )}
              <button
                onClick={() => handleStatusChange('revoked')}
                className="btn-danger"
              >
                Revoke Contract
              </button>
            </div>
            <div className="lifecycle-info">
              <p>
                Current status: <strong>{STATUS_LABELS[contract.status]}</strong>
              </p>
              {nextStatus && (
                <p>Next step: {STATUS_LABELS[nextStatus]}</p>
              )}
              {!nextStatus && (
                <p>Contract is at the final status.</p>
              )}
            </div>
          </div>
        )}

        {(isLocked || isRevoked) && (
          <div className="lifecycle-section">
            <h2>Contract Status</h2>
            <div className="status-message">
              {isLocked && (
                <p className="locked-message">
                  This contract is locked and cannot be edited or have its status changed.
                </p>
              )}
              {isRevoked && (
                <p className="revoked-message">
                  This contract has been revoked and cannot proceed further in the lifecycle.
                </p>
              )}
            </div>
          </div>
        )}

        <div className="fields-section">
          <h2>Contract Fields</h2>
          <div className="fields-list">
            {blueprint.fields.map((field) => {
              const value = contract.fieldValues[field.id];
              return (
                <div key={field.id} className="field-display">
                  <div className="field-label">{field.label}:</div>
                  <div className="field-value">
                    {field.type === 'checkbox'
                      ? value
                        ? 'Checked'
                        : 'Unchecked'
                      : field.type === 'date'
                      ? value
                        ? format(value as Date, 'MMM dd, yyyy')
                        : 'Not set'
                      : value || 'Not set'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
