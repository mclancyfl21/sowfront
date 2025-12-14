import React, { useState, useEffect } from 'react';
import styles from './ExpandableModal.module.css';

const ExpandableModal = ({ label, initialValue, isOpen, onClose, onSave }) => {
  const [currentValue, setCurrentValue] = useState(initialValue);

  useEffect(() => {
    setCurrentValue(initialValue); // Update internal state when initialValue prop changes
  }, [initialValue]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(currentValue);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Edit: {label}</h2>
        <textarea
          className={styles.modalTextarea}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
        <div className={styles.modalActions}>
          <button onClick={handleSave} className={styles.saveButton}>Save</button>
          <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ExpandableModal;
