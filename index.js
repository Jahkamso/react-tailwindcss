#!/usr/bin/env node

// Shebang line that tells the operating system to run this script using node interpreter

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2]

if (!projectName) {
  console.error("Please provide a project name.");
  process.exit(1);
}

// Function to execute commands synchronously
const execCommand = (command) => {
  try {
    // console.log(`Executing: ${command}`);
    execSync(command, { stdio: "inherit" });
  } catch (err) {
    console.error(`Error executing command: ${command}\n${err.message}`);
    process.exit(1);
  }
};

// Create React app
console.log("Creating React project...");
execCommand(`npm create vite@latest ${projectName}`);

process.chdir(projectName)

// Install and initialize its configurations
console.log("Installing Tailwind CSS...");
execCommand(
  "npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p"
);

const cssContentForTailwind = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;

const appComponentFileContent = `import './index.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 text-slate-400 bg-black">
      <h1 className="text-3xl font-bold">App Component</h1>
      <button className="bg-white text-black font-semibold rounded-sm py-2 px-4">Click me</button>
    </div>
  );
}

export default App;
`;

const tailwindConfigJsFile = `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;

// Function to write file content if the file exists
const writeFileIfExists = (filePath, content) => {
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
};

writeFileIfExists("./src/App.tsx", appComponentFileContent);
writeFileIfExists("./src/App.jsx", appComponentFileContent);
writeFileIfExists("./src/index.css", cssContentForTailwind);
writeFileIfExists("./tailwind.config.js", tailwindConfigJsFile);
writeFileIfExists("./tailwind.config.ts", tailwindConfigJsFile);

console.log("React and Tailwind CSS setup completed successfully.");
