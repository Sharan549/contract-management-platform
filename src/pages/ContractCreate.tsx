import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { Field } from '../types';
import { format } from 'date-fns';
import './ContractCreate.css';

export default function ContractCreate() {
  const { blueprintId } = useParams<{ blueprintId: string }>();
  const navigate = useNavigate();
  const { getBlueprint, addContract } = useStore();
  const [blueprint, setBlueprint] = useState(getBlueprint(blueprintId || ''));
  const [contractName, setContractName] = useState('');
  const [fieldValues, setFieldValues] = useState<Record<string, string | boolean | Date | null>>(
    {}
  );

  useEffect(() => {
    if (!blueprintId || !blueprint) {
      navigate('/blueprints');
      return;
    }
    // Initialize field values
    const initialValues: Record<string, string | boolean | Date | null> = {};
    blueprint.fields.forEach((field) => {
      if (field.type === 'checkbox') {
        initialValues[field.id] = false;
      } else if (field.type === 'date') {
        initialValues[field.id] = null;
      } else {
        initialValues[field.id] = '';
      }
    });
    setFieldValues(initialValues);
  }, [blueprintId, blueprint, navigate]);

  const handleFieldChange = (fieldId: string, value: string | boolean | Date | null) => {
    setFieldValues({
      ...fieldValues,
      [fieldId]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractName.trim()) {
      alert('Please enter a contract name');
      return;
    }
    if (!blueprint) return;

    // Validate required fields
    for (const field of blueprint.fields) {
      if (field.required) {
        const value = fieldValues[field.id];
        if (value === '' || value === null || value === false) {
          alert(`Please fill in the required field: ${field.label}`);
          return;
        }
      }
    }

    addContract({
      name: contractName,
      blueprintId: blueprint.id,
      blueprintName: blueprint.name,
      status: 'created',
      fieldValues,
    });

    navigate('/');
  };

  if (!blueprint) {
    return null;
  }

  return (
    <div className="contract-create">
      <div className="page-header">
        <h1>Create Contract from {blueprint.name}</h1>
        <button onClick={() => navigate('/blueprints')} className="btn-secondary">
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="contract-form">
        <div className="form-section">
          <label htmlFor="contract-name">Contract Name</label>
          <input
            id="contract-name"
            type="text"
            value={contractName}
            onChange={(e) => setContractName(e.target.value)}
            placeholder="Enter contract name"
            required
          />
        </div>

        <div className="form-section">
          <h2>Fill Contract Fields</h2>
          <div className="contract-fields">
            {blueprint.fields.map((field) => (
              <div key={field.id} className="field-group">
                <label htmlFor={field.id}>
                  {field.label}
                  {field.required && <span className="required-asterisk">*</span>}
                </label>
                {renderFieldInput(field, fieldValues[field.id], (value) =>
                  handleFieldChange(field.id, value)
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Create Contract
          </button>
        </div>
      </form>
    </div>
  );
}

function renderFieldInput(
  field: Field,
  value: string | boolean | Date | null,
  onChange: (value: string | boolean | Date | null) => void
) {
  switch (field.type) {
    case 'text':
      return (
        <input
          id={field.id}
          type="text"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      );
    case 'date':
      return (
        <input
          id={field.id}
          type="date"
          value={value ? format(value as Date, 'yyyy-MM-dd') : ''}
          onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : null)}
          required={field.required}
        />
      );
    case 'checkbox':
      return (
        <label className="checkbox-label">
          <input
            id={field.id}
            type="checkbox"
            checked={value as boolean}
            onChange={(e) => onChange(e.target.checked)}
            required={field.required}
          />
          <span>Check to agree</span>
        </label>
      );
    case 'signature':
      return (
        <div>
          <textarea
            id={field.id}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter signature or name"
            required={field.required}
            rows={3}
          />
          <p className="field-hint">Enter your name or signature text</p>
        </div>
      );
    default:
      return null;
  }
}
