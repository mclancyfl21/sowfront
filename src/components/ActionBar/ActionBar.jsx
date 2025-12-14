import React from 'react';
import styles from './ActionBar.module.css';

const ActionBar = ({ onImportJson, onExportJson, onGenerateDocument, isLoading }) => { // Accept isLoading prop
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImportJson(file);
      // Reset the input so the same file can be imported again if needed
      event.target.value = null;
    }
  };

  return (
    <div className={styles.actionBar}>
      <label htmlFor="json-import" className={styles.actionButton} style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>
        Import JSON
        <input
          id="json-import"
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: 'none' }} // Hide the default file input
          disabled={isLoading} // Disable the input
        />
      </label>
      <button onClick={onExportJson} className={styles.actionButton} disabled={isLoading}>
        Export JSON
      </button>
      <button onClick={onGenerateDocument} className={styles.actionButton} disabled={isLoading}>
        Generate SoW Document
      </button>
    </div>
  );
};

export default ActionBar;
