import React from 'react';
import styles from './FormField.module.css';

const FormField = ({ label, value, locked, onValueChange, onLockToggle, onExpandRequest }) => {
  const inputId = `field-${label.replace(/[^a-zA-Z0-9]/g, '-')}`; // Unique ID for input, sanitizing label

  return (
    <div className={styles.formField}>
      <div className={styles.labelContainer}>
        <label htmlFor={inputId} className={styles.label}>
          {label}:
        </label>
        {onExpandRequest && ( // Only show expand button if onExpandRequest is provided
          <button
            type="button"
            onClick={onExpandRequest}
            className={styles.expandButton}
            title="Expand for more space"
          >
            &#x2922; {/* Expand icon */}
          </button>
        )}
      </div>
      <input
        id={inputId}
        type="text"
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
