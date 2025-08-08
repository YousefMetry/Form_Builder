import React from 'react';
import ConditionBuilder from './ConditionBuilder';

const FieldCard = ({
  field,
  fieldIndex,
  onUpdateField,
  onRemoveField,
  onAddCondition,
  onUpdateCondition,
  onRemoveCondition,
  availableFields,
  previewValues
}) => {
  const handleLabelChange = (e) => {
    onUpdateField(field.id, { label: e.target.value });
  };

  const handleRequiredChange = (e) => {
    onUpdateField(field.id, { required: e.target.checked });
  };

  const handleOptionAdd = () => {
    const newOptions = [...field.options, `Option ${field.options.length + 1}`];
    onUpdateField(field.id, { options: newOptions });
  };

  const handleOptionRemove = (index) => {
    const newOptions = field.options.filter((_, i) => i !== index);
    onUpdateField(field.id, { options: newOptions });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...field.options];
    newOptions[index] = value;
    onUpdateField(field.id, { options: newOptions });
  };

  const getFieldTypeDisplay = (type) => {
    const typeMap = {
      text: 'Text Input',
      number: 'Number Input',
      dropdown: 'Dropdown',
      date: 'Date Input',
      'checkbox-group': 'Checkbox',
    };
    return typeMap[type] || type;
  };

  return (
    <div className="field-card">
      <div className="field-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="field-type">{getFieldTypeDisplay(field.type)}</span>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            Field #{fieldIndex + 1}
          </span>
        </div>
        <div className="field-actions">
          {field.type === 'dropdown' && (
            <button
              className="btn btn-secondary"
              onClick={() => onAddCondition(field.id)}
              disabled={field.condition !== null}
              title="Add conditional logic"
            >
              🔗 Add Condition
            </button>
          )}
          <button
            className="btn btn-danger"
            onClick={() => onRemoveField(field.id)}
            title="Remove field"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor={`label-${field.id}`}>Field Label:</label>
        <input
          id={`label-${field.id}`}
          type="text"
          className="form-control"
          value={field.label}
          onChange={handleLabelChange}
          placeholder="Enter field label"
        />
      </div>

      {field.type === 'checkbox' && (
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" disabled style={{ pointerEvents: 'none' }} />
            {field.label || 'Checkbox'}
          </label>
        </div>
      )}

      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={field.required}
            onChange={handleRequiredChange}
          />
          Required field
        </label>
      </div>

      {field.type === 'dropdown' && (
        <div className="form-group">
          <label>Dropdown Options:</label>
          <div className="options-list">
            {field.options.map((option, index) => (
              <div key={index} className="option-item">
                <input
                  type="text"
                  className="form-control"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => handleOptionRemove(index)}
                  disabled={field.options.length <= 1}
                  title="Remove option"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              className="btn btn-secondary"
              onClick={handleOptionAdd}
              style={{ marginTop: '0.5rem' }}
            >
              ➕ Add Option
            </button>
          </div>
        </div>
      )}

      {field.type === 'checkbox-group' && (
        <div className="form-group">
          <label>Choices:</label>
          <div className="options-list">
            {field.options.map((option, index) => (
              <div key={index} className="option-item">
                <input
                  type="text"
                  className="form-control"
                  value={option}
                  onChange={e => handleOptionChange(index, e.target.value)}
                  placeholder={`Choice ${index + 1}`}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => handleOptionRemove(index)}
                  disabled={field.options.length <= 1}
                  title="Remove choice"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              className="btn btn-secondary"
              onClick={handleOptionAdd}
              style={{ marginTop: '0.5rem' }}
            >
              ➕ Add Choice
            </button>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <strong>Preview:</strong>
            <div>
              {field.options.map((option, idx) => (
                <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <input type="checkbox" disabled style={{ pointerEvents: 'none' }} />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {field.condition && (
        <ConditionBuilder
          condition={field.condition}
          availableFields={availableFields}
          previewValues={previewValues}
          onUpdateCondition={(updates) => onUpdateCondition(field.id, updates)}
          onRemoveCondition={() => onRemoveCondition(field.id)}
        />
      )}
    </div>
  );
};

export default FieldCard; 