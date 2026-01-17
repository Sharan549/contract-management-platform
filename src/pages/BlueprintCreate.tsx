import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { Field, FieldType } from '../types';
import { uuidv4 } from '../store/utils';
import './BlueprintCreate.css';

export default function BlueprintCreate() {
  const navigate = useNavigate();
  const { addBlueprint } = useStore();
  const [blueprintName, setBlueprintName] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [newField, setNewField] = useState<{
    type: FieldType;
    label: string;
    x: string;
    y: string;
    required: boolean;
  }>({
    type: 'text',
    label: '',
    x: '50',
    y: '50',
    required: false,
  });

  const handleAddField = () => {
    if (!newField.label.trim()) {
      alert('Please enter a field label');
      return;
    }

    const field: Field = {
      id: uuidv4(),
      type: newField.type,
      label: newField.label,
      position: {
        x: parseInt(newField.x) || 50,
        y: parseInt(newField.y) || 50,
      },
      required: newField.required,
    };

    setFields([...fields, field]);
    setNewField({
      type: 'text',
      label: '',
      x: String((parseInt(newField.y) || 50) + 100),
      y: String((parseInt(newField.y) || 50) + 100),
      required: false,
    });
  };

  const handleRemoveField = (fieldId: string) => {
    setFields(fields.filter((f) => f.id !== fieldId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blueprintName.trim()) {
      alert('Please enter a blueprint name');
      return;
    }
    if (fields.length === 0) {
      alert('Please add at least one field');
      return;
    }

    addBlueprint({
      name: blueprintName,
      fields,
    });

    navigate('/blueprints');
  };

  return (
    <div className="blueprint-create">
      <div className="page-header">
        <h1>Create Blueprint</h1>
        <button onClick={() => navigate('/blueprints')} className="btn-secondary">
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="blueprint-form">
        <div className="form-section">
          <label htmlFor="blueprint-name">Blueprint Name</label>
          <input
            id="blueprint-name"
            type="text"
            value={blueprintName}
            onChange={(e) => setBlueprintName(e.target.value)}
            placeholder="Enter blueprint name"
            required
          />
        </div>

        <div className="form-section">
          <h2>Add Fields</h2>
          <div className="field-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="field-type">Field Type</label>
                <select
                  id="field-type"
                  value={newField.type}
                  onChange={(e) => setNewField({ ...newField, type: e.target.value as FieldType })}
                >
                  <option value="text">Text</option>
                  <option value="date">Date</option>
                  <option value="signature">Signature</option>
                  <option value="checkbox">Checkbox</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="field-label">Label</label>
                <input
                  id="field-label"
                  type="text"
                  value={newField.label}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  placeholder="Field label"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="field-x">X Position</label>
                <input
                  id="field-x"
                  type="number"
                  value={newField.x}
                  onChange={(e) => setNewField({ ...newField, x: e.target.value })}
                  placeholder="X"
                />
              </div>

              <div className="form-group">
                <label htmlFor="field-y">Y Position</label>
                <input
                  id="field-y"
                  type="number"
                  value={newField.y}
                  onChange={(e) => setNewField({ ...newField, y: e.target.value })}
                  placeholder="Y"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={newField.required}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                />
                Required field
              </label>
            </div>

            <button type="button" onClick={handleAddField} className="btn-secondary">
              Add Field
            </button>
          </div>
        </div>

        {fields.length > 0 && (
          <div className="form-section">
            <h2>Fields ({fields.length})</h2>
            <div className="fields-list">
              {fields.map((field) => (
                <div key={field.id} className="field-item">
                  <div className="field-info">
                    <span className="field-type-badge">{field.type}</span>
                    <span className="field-label">{field.label}</span>
                    {field.required && <span className="required-badge">Required</span>}
                    <span className="field-position">
                      Position: ({field.position.x}, {field.position.y})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveField(field.id)}
                    className="btn-danger btn-small"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Create Blueprint
          </button>
        </div>
      </form>
    </div>
  );
}
