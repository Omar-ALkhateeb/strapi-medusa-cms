const fs = require("fs");
const path = require("path");

// The directory where your APIs live
const apiDir = path.join(__dirname, "src", "api");

// Helper to write file if it doesn't exist
const writeFile = (filePath, content) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created: ${filePath}`);
  } else {
    console.log(`ℹ️  Skipped (already exists): ${filePath}`);
  }
};

const generateBoilerplate = () => {
  if (!fs.existsSync(apiDir)) {
    console.error("❌ Error: src/api directory not found.");
    return;
  }

  const folders = fs.readdirSync(apiDir);

  folders.forEach((folder) => {
    const folderPath = path.join(apiDir, folder);

    // Only process directories that have a 'content-types' subfolder
    if (
      fs.statSync(folderPath).isDirectory() &&
      fs.existsSync(path.join(folderPath, "content-types"))
    ) {
      const apiId = `api::${folder}.${folder}`;

      // 1. Generate Route
      const routeContent = `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreRouter('${apiId}');\n`;
      writeFile(path.join(folderPath, "routes", `${folder}.ts`), routeContent);

      // 2. Generate Controller
      const controllerContent = `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreController('${apiId}');\n`;
      writeFile(
        path.join(folderPath, "controllers", `${folder}.ts`),
        controllerContent,
      );

      // 3. Generate Service
      const serviceContent = `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreService('${apiId}');\n`;
      writeFile(
        path.join(folderPath, "services", `${folder}.ts`),
        serviceContent,
      );
    }
  });

  console.log("\n🚀 All set! Commit these files and push to GitHub.");
};

generateBoilerplate();
