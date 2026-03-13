const fs = require("fs");
const path = require("path");

const apiDir = path.join(__dirname, "src", "api");

const writeFile = (filePath, content) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created/Updated: ${filePath}`);
};

const generateBoilerplate = () => {
  if (!fs.existsSync(apiDir)) {
    console.error("❌ src/api directory not found.");
    return;
  }

  const folders = fs.readdirSync(apiDir);

  folders.forEach((folder) => {
    const folderPath = path.join(apiDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) return;

    // FIX 1: Ensure schema is in the correct Strapi v4 folder
    const wrongSchemaPath = path.join(folderPath, "schema.json");
    const correctSchemaDir = path.join(folderPath, "content-types", folder);
    const correctSchemaPath = path.join(correctSchemaDir, "schema.json");

    if (fs.existsSync(wrongSchemaPath)) {
      if (!fs.existsSync(correctSchemaDir))
        fs.mkdirSync(correctSchemaDir, { recursive: true });
      fs.renameSync(wrongSchemaPath, correctSchemaPath);
      console.log(`📂 Moved schema for ${folder} to correct sub-folder.`);
    }

    // FIX 2: Generate files with 'as any' to bypass TypeScript build errors
    const apiId = `api::${folder}.${folder}`;

    // Routes
    writeFile(
      path.join(folderPath, "routes", `${folder}.ts`),
      `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreRouter('${apiId}' as any);\n`,
    );

    // Controllers
    writeFile(
      path.join(folderPath, "controllers", `${folder}.ts`),
      `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreController('${apiId}' as any);\n`,
    );

    // Services
    writeFile(
      path.join(folderPath, "services", `${folder}.ts`),
      `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreService('${apiId}' as any);\n`,
    );
  });

  console.log("\n🚀 Fixes applied. Ready to push to GitHub.");
};

generateBoilerplate();
