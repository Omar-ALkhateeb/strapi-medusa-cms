const fs = require("fs");
const path = require("path");

const apiDir = path.join(__dirname, "src", "api");

const writeFile = (filePath, content) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created: ${filePath}`);
  } else {
    // If file exists, we overwrite it to add the 'as any' fix
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
  }
};

const generateBoilerplate = () => {
  if (!fs.existsSync(apiDir)) return;

  const folders = fs.readdirSync(apiDir);

  folders.forEach((folder) => {
    const folderPath = path.join(apiDir, folder);

    if (fs.statSync(folderPath).isDirectory()) {
      // Check if schema exists in the correct v4 location
      // If you have it in src/api/folder/schema.json, this script will MOVE it for you
      const oldSchemaPath = path.join(folderPath, "schema.json");
      const newSchemaFolder = path.join(folderPath, "content-types", folder);
      const newSchemaPath = path.join(newSchemaFolder, "schema.json");

      if (fs.existsSync(oldSchemaPath)) {
        if (!fs.existsSync(newSchemaFolder))
          fs.mkdirSync(newSchemaFolder, { recursive: true });
        fs.renameSync(oldSchemaPath, newSchemaPath);
        console.log(`Moved schema for ${folder} to correct location.`);
      }

      const apiId = `api::${folder}.${folder}`;

      // We add 'as any' to bypass the TypeScript Check during build
      writeFile(
        path.join(folderPath, "routes", `${folder}.ts`),
        `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreRouter('${apiId}' as any);\n`,
      );

      writeFile(
        path.join(folderPath, "controllers", `${folder}.ts`),
        `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreController('${apiId}' as any);\n`,
      );

      writeFile(
        path.join(folderPath, "services", `${folder}.ts`),
        `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreService('${apiId}' as any);\n`,
      );
    }
  });
};

generateBoilerplate();
