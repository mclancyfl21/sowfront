export const importJsonFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file selected."));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        resolve(json);
      } catch (error) {
        reject(new Error("Failed to parse JSON file: " + error.message));
      }
    };

    reader.onerror = (error) => {
      reject(new Error("Error reading file: " + error.message));
    };

    reader.readAsText(file);
  });
};