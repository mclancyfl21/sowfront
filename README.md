# SoWMaker2 - Frontend

## Project Overview
SoWMaker2 is a web application designed to streamline the creation of Statements of Work (SoW). This directory (`sowfront`) contains the React-based frontend responsible for data entry and management. The frontend interacts with an AWS Lambda (Python) backend for generating formatted Word documents (`.docx`).

## Features
*   **Interactive Data Entry:** A user-friendly interface with 28 editable fields corresponding to key SoW sections.
*   **Field Locking:** Each field can be individually locked/unlocked, preventing accidental edits.
*   **JSON Import/Export:** Ability to import SoW data from a JSON file and export the current form data to a JSON file.
*   **Dynamic Document Generation:** Triggers a complete `.docx` SoW document generation by sending data and a template to an AWS Lambda function.

## Technology Stack
*   **Frontend:** React.js
*   **Deployment:** Vercel (planned)

## Project Structure
This `sowfront` directory contains the React application. Key files outside this directory include:
*   `GEMINI.md`: AI Assistant context file (in project root).
*   `details.json`: Contains the 28 data points/keys used for the SoW fields (in project root).
*   `Mash_SoW_Template.docx`: The master Word document template for SoW generation (in project root).
*   `sowmkr2.py`: A utility Python script demonstrating document generation logic (in project root).

## Setup & Installation

### Frontend (sowfront)
1.  Navigate into this frontend directory:
    ```bash
    cd sowfront
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
    (The application will typically open in your browser at `http://localhost:3000`).

## Usage
1.  Run the frontend development server (as described above).
2.  Use the UI to enter or import SoW data.
3.  Export data to JSON or trigger document generation.

## Development Notes
*   Refer to `GEMINI.md` in the project root for detailed AI assistant context and further development tasks for the entire project.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)