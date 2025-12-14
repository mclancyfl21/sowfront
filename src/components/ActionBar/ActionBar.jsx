import React from 'react';
import styles from './ActionBar.module.css';

const ActionBar = ({ onImportJson, onExportJson, onGenerateDocument, onTemplateFileSelect, isLoading }) => {
  const handleJsonFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImportJson(file);
      event.target.value = null; // Reset input
    }
  };

  const handleTemplateFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onTemplateFileSelect(file);
      // Don't reset here, as the user might want to see which file is selected
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
          onChange={handleJsonFileChange}
          style={{ display: 'none' }}
          disabled={isLoading}
        />
      </label>
      
      {/* New: Template File Input */}
      <label htmlFor="template-import" className={styles.actionButton} style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>
        Select Template (.docx)
        <input
          id="template-import"
          type="file"
          accept=".docx"
          onChange={handleTemplateFileChange}
          style={{ display: 'none' }}
          disabled={isLoading}
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
