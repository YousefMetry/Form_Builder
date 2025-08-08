import React from 'react';

const ConditionBuilder = ({
  condition,
  availableFields,
  previewValues,
  onUpdateCondition,
  onRemoveCondition
}) => {
  const handleTargetFieldChange = (e) => {
    onUpdateCondition({ targetFieldId: e.target.value });
  };

  const handleOperatorChange = (e) => {
    onUpdateCondition({ operator: e.target.value });
  };

  const handleValueChange = (e) => {
    onUpdateCondition({ value: e.target.value });
  };

  const getTargetFieldOptions = () => {
    return availableFields.map(field => ({
      value: field.id,
      label: field.label,
      type: field.type
    }));
  };

  const getOperatorOptions = () => [
    { value: 'equals', label: 'equals' },
    { value: 'not_equals', label: 'does not equal' }
  ];

  const getValueOptions = () => {
    const targetField = availableFields.find(f => f.id === condition.targetFieldId);
    if (targetField && targetField.type === 'dropdown') {
      return targetField.options;
    }
    return [];
  };

  const isConditionValid = () => {
    return condition.targetFieldId && condition.operator && condition.value;
  };

  const getConditionStatus = () => {
    if (!isConditionValid()) return 'incomplete';
    
    const targetValue = previewValues[condition.targetFieldId];
    if (condition.operator === 'equals') {
      return targetValue === condition.value ? 'met' : 'not_met';
    } else if (condition.operator === 'not_equals') {
      return targetValue !== condition.value ? 'met' : 'not_met';
    }
    return 'unknown';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'met': return '#27ae60';
      case 'not_met': return '#e74c3c';
      case 'incomplete': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'met': return 'Condition met - Field will be shown';
      case 'not_met': return 'Condition not met - Field will be hidden';
      case 'incomplete': return 'Condition incomplete';
      default: return 'Unknown status';
    }
  };

  const status = getConditionStatus();

  return (
    <div className="condition-card">
      <div className="condition-header">
        <span className="condition-type">Conditional Logic</span>
        <button
          className="btn btn-danger"
          onClick={onRemoveCondition}
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
          title="Remove condition"
        >
          ✕
        </button>
      </div>

      <div style={{ 
        padding: '0.5rem', 
        backgroundColor: getStatusColor(status), 
        color: 'white', 
        borderRadius: '4px', 
        fontSize: '0.8rem',
        marginBottom: '0.5rem'
      }}>
        {getStatusText(status)}
      </div>

      <div className="form-group">
        <label>Show this field only if:</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <select
            className="form-control"
            value={condition.targetFieldId}
            onChange={handleTargetFieldChange}
            style={{ flex: '1', minWidth: '150px' }}
          >
            <option value="">Select a field...</option>
            {getTargetFieldOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.type})
              </option>
            ))}
          </select>

          <select
            className="form-control"
            value={condition.operator}
            onChange={handleOperatorChange}
            style={{ minWidth: '120px' }}
          >
            {getOperatorOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {condition.targetFieldId && (
            <div style={{ flex: '1', minWidth: '120px' }}>
              {getValueOptions().length > 0 ? (
                <select
                  className="form-control"
                  value={condition.value}
                  onChange={handleValueChange}
                >
                  <option value="">Select value...</option>
                  {getValueOptions().map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  value={condition.value}
                  onChange={handleValueChange}
                  placeholder="Enter value..."
                />
              )}
            </div>
          )}
        </div>
      </div>

      {condition.targetFieldId && (
        <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
          <strong>Current value:</strong> {previewValues[condition.targetFieldId] || '(empty)'}
        </div>
      )}
    </div>
  );
};

export default ConditionBuilder; 