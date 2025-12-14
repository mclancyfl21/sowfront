import React from 'react';
import styles from './FormField.module.css';

const FormField = ({ label, value, locked, onValueChange, onLockToggle }) => {
  const inputId = `field-${label.replace(/[^a-zA-Z0-9]/g, '-')}`; // Unique ID for input, sanitizing label

  return (
    <div className={styles.formField}>
      <label htmlFor={inputId} className={styles.label}>
        {label}:
      </label>
      <input
        id={inputId}
        type="text" // Can be expanded to textarea based on content length
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        readOnly={locked}
        className={`${styles.input} ${locked ? styles.locked : ''}`}
      />
      <div className={styles.lockToggle}>
        <input
          type="checkbox"
          id={`${inputId}-lock`}
          checked={locked}
          onChange={onLockToggle}
        />
        <label htmlFor={`${inputId}-lock`}>Locked</label>
      </div>
    </div>
  );
};

export default FormField;
