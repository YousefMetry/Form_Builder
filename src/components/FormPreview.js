import React from 'react';

const FormPreview = ({
  fields,
  previewValues,
  onUpdateValue,
  onSubmit,
  validationErrors,
  isFieldVisible
}) => {
  const handleInputChange = (fieldId, value) => {
    onUpdateValue(fieldId, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const renderField = (field) => {
    if (!isFieldVisible(field)) {
      return null;
    }

    const hasError = validationErrors[field.id];
    const fieldValue = previewValues[field.id] || '';

    return (
      <div key={field.id} className="preview-field">
        <label htmlFor={`preview-${field.id}`}>
          {field.label}
          {field.required && <span className="required-indicator">*</span>}
        </label>

        {field.type === 'text' && (
          <input
            id={`preview-${field.id}`}
            type="text"
            value={fieldValue}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={hasError ? 'form-control error' : 'form-control'}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        )}

        {field.type === 'number' && (
          <input
            id={`preview-${field.id}`}
            type="number"
            value={fieldValue}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={hasError ? 'form-control error' : 'form-control'}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        )}

        {field.type === 'dropdown' && (
          <select
            id={`preview-${field.id}`}
            value={fieldValue}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={hasError ? 'form-control error' : 'form-control'}
          >
            <option value="">Select an option...</option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {field.type === 'date' && (
          <input
            id={`preview-${field.id}`}
            type="date"
            value={fieldValue}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={hasError ? 'form-control error' : 'form-control'}
            placeholder={`Select ${field.label.toLowerCase()}`}
          />
        )}

        {field.type === 'checkbox' && (
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              id={`preview-${field.id}`}
              type="checkbox"
              checked={!!fieldValue}
              onChange={e => handleInputChange(field.id, e.target.checked)}
              className={hasError ? 'form-control error' : 'form-control'}
            />
            {field.label}
            {field.required && <span className="required-indicator">*</span>}
          </label>
        )}

        {field.type === 'checkbox-group' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '0.5rem' }}>
            <div style={{ fontWeight: 'bold', minWidth: '120px' }}>
              {field.label}{field.required && <span className="required-indicator">*</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {field.options.map((option, idx) => (
                <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 0 }}>
                  <input
                    type="checkbox"
                    checked={Array.isArray(fieldValue) ? fieldValue.includes(option) : false}
                    onChange={e => {
                      let newValue = Array.isArray(fieldValue) ? [...fieldValue] : [];
                      if (e.target.checked) {
                        newValue.push(option);
                      } else {
                        newValue = newValue.filter(v => v !== option);
                      }
                      handleInputChange(field.id, newValue);
                    }}
                    className={hasError ? 'form-control error' : 'form-control'}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}

        {hasError && (
          <div className="error-message">{hasError}</div>
        )}
      </div>
    );
  };

  const visibleFields = fields.filter(isFieldVisible);
  const hasVisibleFields = visibleFields.length > 0;

  return (
    <div className="preview-form">
      <h3>Form Preview</h3>
      
      {!hasVisibleFields ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          <p>No fields to display in preview</p>
          <p style={{ fontSize: '0.9rem' }}>
            Add some fields to the form builder to see them here
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {visibleFields.map(renderField)}
          
          <div style={{ marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-success">
              📤 Submit Form
            </button>
          </div>
        </form>
      )}

      {Object.keys(validationErrors).length > 0 && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
          <h4 style={{ color: '#721c24', marginBottom: '0.5rem' }}>Validation Errors:</h4>
          <ul style={{ color: '#721c24', margin: 0, paddingLeft: '1.5rem' }}>
            {Object.values(validationErrors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
        <p><strong>Preview Info:</strong></p>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
          <li>Fields with conditions will show/hide based on other field values</li>
          <li>Required fields are marked with a red asterisk (*)</li>
          <li>Form validation occurs on submission</li>
          <li>Changes in the preview are reflected in real-time</li>
        </ul>
      </div>
    </div>
  );
};

export default FormPreview; 