import React, { useState } from 'react'; // Import useState
import { useSoWForm } from '../../hooks/useSoWForm';
import FormField from '../../components/FormField/FormField';
import ActionBar from '../../components/ActionBar/ActionBar';
import ExpandableModal from '../../components/ExpandableModal/ExpandableModal'; // Import ExpandableModal
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

  const [selectedTemplateFile, setSelectedTemplateFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [editingFieldKey, setEditingFieldKey] = useState(null); // State for which field is being edited

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
        return;
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

  // New: Handlers for modal
  const handleExpandRequest = (key) => {
    setEditingFieldKey(key);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingFieldKey(null);
  };

  const handleModalSave = (newValue) => {
    handleFieldChange(editingFieldKey, newValue); // Update the form data
    setIsModalOpen(false);
    setEditingFieldKey(null);
  };

  // Get current field data for the modal
  const modalFieldLabel = editingFieldKey ? editingFieldKey.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : '';
  const modalInitialValue = editingFieldKey ? formData[editingFieldKey].value : '';


  return (
    <div className={styles.soWEditor}>
      <h1>Statement of Work Editor</h1>

      {isLoading && <div className={styles.loadingIndicator}>Loading...</div>}

      <ActionBar
        onImportJson={handleImport}
        onExportJson={handleExport}
        onGenerateDocument={handleGenerateDocument}
        onTemplateFileSelect={handleTemplateFileSelect}
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
            onExpandRequest={() => handleExpandRequest(key)} // Pass expand request handler
          />
        ))}
      </div>

      {isModalOpen && (
        <ExpandableModal
          label={modalFieldLabel}
          initialValue={modalInitialValue}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
};

export default SoWEditor;