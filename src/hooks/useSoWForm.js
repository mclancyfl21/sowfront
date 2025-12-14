import { useState } from 'react';

// Initial data from details.json for structure and default values
const initialSoWData = {
    "project_title_and_document_information": "Test Case: Partial Data Rendering SOW",
    "parties_involved": "Client: Beta Solutions | Vendor: Mash Technology Group",
    "project_objectives_and_business_drivers": "add appropirate details here",
    "scope_of_work": "Implementation of core HRIS Time & Attendance module.",
    "in_scope_modules_and_functionality": "Time tracking, leave requests, and supervisor approvals.",
    "out_of_scope_items": "add appropirate details here",
    "assumptions": "All employee data will be provided in a clean CSV format 1 week before migration.",
    "project_approach_and_methodology": "Standard Waterfall approach with a 3-month fixed schedule.",
    "project_phases_and_milestones": "add appropirate details here",
    "deliverables": "Initial Configuration Report, User Training Videos, Go-Live Plan.",
    "project_timeline___schedule": "Project Start: Q1 2026 | Go-Live Target: Q2 2026.",
    "roles_and_responsibilities_client_and_vendor_partner": "add appropirate details here",
    "project_governance_and_escalation_process": "Bi-weekly status meetings. Escalation via Project Manager.",
    "resource_plan_client_and_implementation_partner": "Client: 2 dedicated SMEs | Vendor: 3 Consultants (Remote).",
    "change_request_management": "add appropirate details here",
    "testing_strategy": "One round of System Testing followed by one round of UAT.",
    "data_migration_approach": "Migration of only active employee master data. No historical time data will be migrated.",
    "integration_approach": "add appropirate details here",
    "customizations_and_reports_ricefw": "2 Custom Reports for time-off accrual tracking.",
    "training_strategy_and_plan": "Self-paced video modules for all 500 end-users.",
    "cutover_and_go_live_plan": "add appropirate details here",
    "hypercare___post_go_live_support": "2 weeks of post-go-live support.",
    "acceptance_criteria": "All core time reporting processes function correctly and UAT is signed off.",
    "payment_terms_and_milestones": "add appropirate details here",
    "pricing_and_commercial_terms": "Time & Materials (T&M) contract up to $50,000 USD.",
    "risks_and_mitigation": "Risk: Late UAT sign-off. Mitigation: Mandatory daily review sessions.",
    "terms_and_conditions": "add appropirate details here",
    "signatures___approval": "Client: [Signature] | Vendor: [Signature]"
};

const initializeFormState = (data) => {
    const formState = {};
    for (const key in data) {
        formState[key] = {
            value: data[key],
            locked: true // All fields are locked by default
        };
    }
    return formState;
};

export const useSoWForm = () => {
    const [formData, setFormData] = useState(() => initializeFormState(initialSoWData));
    const [isLoading, setIsLoading] = useState(false); // Add isLoading state

    const handleFieldChange = (key, newValue) => {
        setFormData(prevData => ({
            ...prevData,
            [key]: { ...prevData[key], value: newValue }
        }));
    };

    const handleLockToggle = (key) => {
        setFormData(prevData => ({
            ...prevData,
            [key]: { ...prevData[key], locked: !prevData[key].locked }
        }));
    };

    // Function to update all form data, used for importing JSON
    const updateAllFormData = (newJsonData) => {
        setFormData(initializeFormState(newJsonData));
    };

    // Function to extract only values for export
    const getExportData = () => {
        const exportData = {};
        for (const key in formData) {
            exportData[key] = formData[key].value;
        }
        return exportData;
    };

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return {
        formData,
        handleFieldChange,
        handleLockToggle,
        updateAllFormData,
        getExportData,
        isLoading,        // Return isLoading state
        startLoading,     // Return startLoading function
        stopLoading       // Return stopLoading function
    };
};
