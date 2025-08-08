import React, { useState, useEffect, useRef } from 'react';
import FormBuilder from './components/FormBuilder';
import FormPreview from './components/FormPreview';
import './App.css';

function App() {
  // Main state for form configuration
  const [formFields, setFormFields] = useState([]);
  const [previewValues, setPreviewValues] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Undo/redo history
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const isPushingHistory = useRef(false);

  // Helper to push to history
  const pushHistory = (fields, values) => {
    if (!isPushingHistory.current) {
      setHistory(h => [...h, { fields, values }]);
      setFuture([]);
    }
  };

  // Wrap setFormFields and setPreviewValues to push to history
  const setFormFieldsWithHistory = (fields) => {
    pushHistory(formFields, previewValues);
    setFormFields(fields);
  };
  const setPreviewValuesWithHistory = (values) => {
    pushHistory(formFields, previewValues);
    setPreviewValues(values);
  };

  // Undo/redo handlers
  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setFuture(f => [{ fields: formFields, values: previewValues }, ...f]);
    isPushingHistory.current = true;
    setFormFields(last.fields);
    setPreviewValues(last.values);
    setHistory(h => h.slice(0, h.length - 1));
    isPushingHistory.current = false;
  };
  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setHistory(h => [...h, { fields: formFields, values: previewValues }]);
    isPushingHistory.current = true;
    setFormFields(next.fields);
    setPreviewValues(next.values);
    setFuture(f => f.slice(1));
    isPushingHistory.current = false;
  };

  // Load saved form configuration from localStorage on component mount
  useEffect(() => {
    const savedForm = localStorage.getItem('dynamicFormBuilder');
    if (savedForm) {
      try {
        const parsedForm = JSON.parse(savedForm);
        setFormFields(parsedForm.fields || []);
        setPreviewValues(parsedForm.previewValues || {});
      } catch (error) {
        console.error('Error loading saved form:', error);
      }
    }
  }, []);

  // Save form configuration to localStorage whenever it changes
  useEffect(() => {
    const formData = {
      fields: formFields,
      previewValues: previewValues,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('dynamicFormBuilder', JSON.stringify(formData));
  }, [formFields, previewValues]);

  // Add a new field to the form
  const addField = (fieldType) => {
    if (fieldType === 'checkbox') return; // Prevent adding single checkbox fields
    const newField = {
      id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: fieldType,
      label: `New ${fieldType === 'checkbox-group' ? 'Checkbox' : fieldType.charAt(0).toUpperCase() + fieldType.slice(1).replace('-', ' ')}${fieldType === 'checkbox-group' ? '' : ' Field'}`,
      required: false,
      options: fieldType === 'dropdown' ? ['Option 1', 'Option 2'] : fieldType === 'checkbox-group' ? ['Option 1', 'Option 2'] : [],
      condition: null
    };
    setFormFieldsWithHistory([...formFields, newField]);
  };

  // Update a field's properties
  const updateField = (fieldId, updates) => {
    setFormFieldsWithHistory(fields =>
      fields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    );
  };

  // Remove a field from the form
  const removeField = (fieldId) => {
    setFormFieldsWithHistory(fields => fields.filter(field => field.id !== fieldId));
    // Also remove the field's value from preview values
    setPreviewValuesWithHistory(values => {
      const newValues = { ...values };
      delete newValues[fieldId];
      return newValues;
    });
  };

  // Add a condition to a field
  const addCondition = (fieldId) => {
    const field = formFields.find(f => f.id === fieldId);
    if (!field) return;

    const newCondition = {
      id: `condition_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      targetFieldId: '',
      operator: 'equals',
      value: ''
    };

    updateField(fieldId, { condition: newCondition });
  };

  // Update a condition
  const updateCondition = (fieldId, conditionUpdates) => {
    const field = formFields.find(f => f.id === fieldId);
    if (!field || !field.condition) return;

    updateField(fieldId, {
      condition: { ...field.condition, ...conditionUpdates }
    });
  };

  // Remove a condition from a field
  const removeCondition = (fieldId) => {
    updateField(fieldId, { condition: null });
  };

  // Update preview values when user interacts with the preview form
  const updatePreviewValue = (fieldId, value) => {
    setPreviewValuesWithHistory(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  // Check if a field should be visible based on its conditions
  const isFieldVisible = (field) => {
    if (!field.condition) return true;

    const { targetFieldId, operator, value } = field.condition;
    const targetValue = previewValues[targetFieldId];

    if (operator === 'equals') {
      return targetValue === value;
    } else if (operator === 'not_equals') {
      return targetValue !== value;
    }

    return true;
  };

  // Validate the form and handle submission
  const handleFormSubmit = () => {
    const errors = {};
    const visibleFields = formFields.filter(isFieldVisible);

    // Check required fields
    visibleFields.forEach(field => {
      if (field.required) {
        const value = previewValues[field.id];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          errors[field.id] = `${field.label} is required`;
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Prepare submitted data
    const submittedFormData = {
      timestamp: new Date().toISOString(),
      fields: visibleFields.map(field => ({
        id: field.id,
        label: field.label,
        type: field.type,
        value: previewValues[field.id] || ''
      }))
    };

    setSubmittedData(submittedFormData);
    setValidationErrors({});
  };

  // Clear form data
  const clearForm = () => {
    setFormFieldsWithHistory([]);
    setPreviewValuesWithHistory({});
    setSubmittedData(null);
    setValidationErrors({});
  };

  // Load sample form data
  const loadSampleForm = () => {
    const sampleFields = [
      {
        id: 'field_1',
        type: 'text',
        label: 'First Name',
        required: true,
        options: [],
        condition: null
      },
      {
        id: 'field_2',
        type: 'dropdown',
        label: 'Are you employed?',
        required: true,
        options: ['Yes', 'No'],
        condition: null
      },
      {
        id: 'field_3',
        type: 'text',
        label: 'Employer Name',
        required: true,
        options: [],
        condition: {
          id: 'condition_1',
          targetFieldId: 'field_2',
          operator: 'equals',
          value: 'Yes'
        }
      }
    ];

    setFormFieldsWithHistory(sampleFields);
    setPreviewValuesWithHistory({});
    setSubmittedData(null);
    setValidationErrors({});
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>Dynamic Form Builder</h1>
          <p>Create custom forms with conditional logic and real-time preview</p>
        </div>
      </header>

      <div className="container">
        <div className="actions-bar">
          <button className="btn" onClick={() => addField('text')}>
          ✍️ Add Text Field
          </button>
          <button className="btn" onClick={() => addField('number')}>
          📱 Add Number Field
          </button>
          <button className="btn" onClick={() => addField('dropdown')}>
          ⬇️ Add Dropdown
          </button>
          <button className="btn" onClick={() => addField('date')}>
          📅 Add Date Field
          </button>
          <button className="btn" onClick={() => addField('checkbox-group')}>
          ✔️ Add Checkbox
          </button>
          <button className="btn btn-secondary" onClick={loadSampleForm}>
            📋 Load Sample Form
          </button>
          <button className="btn btn-danger" onClick={clearForm}>
            🗑️ Clear Form
          </button>
          <span style={{ flex: 1 }}></span>
          <button className="btn undo-redo-btn" onClick={handleUndo} disabled={history.length === 0} title="Undo">
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ display: 'inline', verticalAlign: 'middle' }}>
              <path d="M7 4L2 9L7 14" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 9H11C13.7614 9 16 11.2386 16 14V14" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="btn undo-redo-btn" onClick={handleRedo} disabled={future.length === 0} title="Redo">
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ display: 'inline', verticalAlign: 'middle' }}>
              <path d="M11 4L16 9L11 14" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 9H7C4.23858 9 2 11.2386 2 14V14" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="main-content">
          <div className="section">
            <h2>Form Builder</h2>
            <FormBuilder
              fields={formFields}
              onAddField={addField}
              onUpdateField={updateField}
              onRemoveField={removeField}
              onAddCondition={addCondition}
              onUpdateCondition={updateCondition}
              onRemoveCondition={removeCondition}
              previewValues={previewValues}
            />
          </div>

          <div className="section">
            <h2>Live Preview</h2>
            <FormPreview
              fields={formFields}
              previewValues={previewValues}
              onUpdateValue={updatePreviewValue}
              onSubmit={handleFormSubmit}
              validationErrors={validationErrors}
              isFieldVisible={isFieldVisible}
            />
          </div>
        </div>

        {submittedData && (
          <div className="section">
            <h2>Form Submission Results</h2>
            <div className="json-output">
              {JSON.stringify(submittedData, null, 2)}
            </div>
            <button 
              className="btn btn-success" 
              onClick={() => setSubmittedData(null)}
              style={{ marginTop: '1rem' }}
            >
              Clear Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 