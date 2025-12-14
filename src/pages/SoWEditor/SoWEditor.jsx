import React, { useState } from 'react'; // Import useState
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
    isLoading,
    startLoading,
    stopLoading       
  } = useSoWForm();

  const [selectedTemplateFile, setSelectedTemplateFile] = useState(null); // State for template file

  const handleImport = async (file) => {
    startLoading();
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
      stopLoading();
    }
  };

  const handleExport = () => {
    startLoading();
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
      stopLoading();
    }
  };

  const handleTemplateFileSelect = (file) => {
    setSelectedTemplateFile(file);
    alert(`Template selected: ${file ? file.name : 'None'}`);
  };

  const handleGenerateDocument = () => {
    startLoading();
    try {
      if (!selectedTemplateFile) {
        alert('Please select a DOCX template file first!');
        return; // Exit if no template
      }
      // Placeholder for actual Lambda call
      alert('Generate Document functionality not yet implemented.');
      console.log("Current data for generation:", getExportData());
      console.log("Selected template file:", selectedTemplateFile);

    } catch (error) {
      alert('Error generating document: ' + error.message);
      console.error("Document generation error:", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className={styles.soWEditor}>
      <h1>Statement of Work Editor</h1>

      {isLoading && <div className={styles.loadingIndicator}>Loading...</div>}

      <ActionBar
        onImportJson={handleImport}
        onExportJson={handleExport}
        onGenerateDocument={handleGenerateDocument}
        onTemplateFileSelect={handleTemplateFileSelect} // Pass handler for template selection
        isLoading={isLoading}
      />

      {selectedTemplateFile && (
        <p className={styles.selectedFileDisplay}>
          Selected Template: <strong>{selectedTemplateFile.name}</strong>
        </p>
      )}

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