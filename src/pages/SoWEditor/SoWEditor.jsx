import React from 'react';
import { useSoWForm } from '../../hooks/useSoWForm';
import FormField from '../../components/FormField/FormField';
import ActionBar from '../../components/ActionBar/ActionBar';
import { importJsonFile } from '../../lib/jsonUtils';

import styles from './SoWEditor.module.css';

const SoWEditor = () => {
  const { 
    formData, 
    handleFieldChange, 
    handleLockToggle, 
    updateAllFormData, 
    getExportData,
    isLoading,        // Get isLoading state
    startLoading,     // Get startLoading function
    stopLoading       // Get stopLoading function
  } = useSoWForm();

  const handleImport = async (file) => {
    startLoading(); // Start loading
    try {
      if (file) {
        const jsonData = await importJsonFile(file);
        updateAllFormData(jsonData);
        alert('JSON imported successfully!');
      }
    } catch (error) {
      alert(error.message);
      console.error("JSON import error:", error);
    } finally {
      stopLoading(); // Stop loading
    }
  };

  const handleExport = () => {
    startLoading(); // Start loading
    try {
      const dataToExport = getExportData();
      const jsonString = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sow_data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('JSON exported successfully!');
    } catch (error) {
      alert('Error exporting JSON: ' + error.message);
      console.error("JSON export error:", error);
    } finally {
      stopLoading(); // Stop loading
    }
  };

  const handleGenerateDocument = () => {
    startLoading(); // Start loading
    try {
      // Placeholder for actual Lambda call
      alert('Generate Document functionality not yet implemented.');
      console.log("Current data for generation:", getExportData());
    } catch (error) {
      alert('Error generating document: ' + error.message);
      console.error("Document generation error:", error);
    } finally {
      stopLoading(); // Stop loading
    }
  };

  return (
    <div className={styles.soWEditor}>
      <h1>Statement of Work Editor</h1>

      {isLoading && <div className={styles.loadingIndicator}>Loading...</div>} {/* Loading indicator */}

      <ActionBar
        onImportJson={handleImport}
        onExportJson={handleExport}
        onGenerateDocument={handleGenerateDocument}
        isLoading={isLoading} // Pass isLoading to ActionBar
      />

      <div className={styles.formGrid}>
        {Object.entries(formData).map(([key, field]) => (
          <FormField
            key={key}
            label={key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
            value={field.value}
            locked={field.locked}
            onValueChange={(newValue) => handleFieldChange(key, newValue)}
            onLockToggle={() => handleLockToggle(key)}
          />
        ))}
      </div>
    </div>
  );
};

export default SoWEditor;