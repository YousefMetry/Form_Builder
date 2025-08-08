import React from 'react';
import FieldCard from './FieldCard';

const FormBuilder = ({
  fields,
  onAddField,
  onUpdateField,
  onRemoveField,
  onAddCondition,
  onUpdateCondition,
  onRemoveCondition,
  previewValues
}) => {
  if (fields.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <h3>No fields added yet</h3>
        <p>Use the buttons above to add your first form field</p>
        <div style={{ marginTop: '1rem' }}>
          <button className="btn" onClick={() => onAddField('text')}>
            ➕ Add Text Field
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {fields.map((field, index) => (
        <FieldCard
          key={field.id}
          field={field}
          fieldIndex={index}
          onUpdateField={onUpdateField}
          onRemoveField={onRemoveField}
          onAddCondition={onAddCondition}
          onUpdateCondition={onUpdateCondition}
          onRemoveCondition={onRemoveCondition}
          availableFields={fields.filter(f => f.id !== field.id)}
          previewValues={previewValues}
        />
      ))}
    </div>
  );
};

export default FormBuilder; 