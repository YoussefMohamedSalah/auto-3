import * as fs from "fs";
import * as path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import returnPage from "./defaultPage.mjs";
import returnCruds from "./defaultCrud.mjs";

const argv = yargs(hideBin(process.argv)).argv;

const fileName = argv.fn;
const formatedName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
const flag = argv.flag;

const createPageContent = () => {
  // Check if the folder exists, create it if not
  const folderPath = `src/screens/${formatedName}`;
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
  let page = returnPage(fileName);
  const filePath = path.join(folderPath, page.name);
  fs.writeFileSync(filePath, page.content);
  console.log(`File created successfully at: ${filePath}`);
};

const createPageCrud = () => {
  // Check if the folder exists, create it if not
  const folderPath = `src/framework/${fileName}`;
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
  let cruds = returnCruds(fileName);
  if (cruds && cruds.length > 0) {
    for (let i = 0; i < cruds.length; i++) {
      const crud = cruds[i];
      const filePath = path.join(folderPath, crud.name);
      fs.writeFileSync(filePath, crud.content);
    }
  }
};

const relatedFiles = () => {
  // Check if the folder exists, create it if not
  const moduleTypes = {
    name: formatedName,
    content: `export interface ${formatedName} { 
  id: string;
};

export interface Selected${formatedName} {
  id: string;
};

export enum ${formatedName}Keys {
  EXAMPLE = 'example',
};

export const ${formatedName}NumKeys = [
  ${formatedName}Keys.EXAMPLE,
];

export const ${formatedName}StrKeys = [
  ${formatedName}Keys.EXAMPLE,
];

export const ${formatedName}RequiredKeys = [
  ${formatedName}Keys.EXAMPLE,
];
`
  };

  const filePath = `src/types/${formatedName}.ts`;
  // if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
  // const filePath = path.join(folderPath, moduleTypes.name);
  fs.writeFileSync(filePath, moduleTypes.content);
  console.log(`File created successfully at: ${filePath}`);
};

const createPage = () => {
  createPageContent();
  relatedFiles();
  createPageCrud();
};

createPage();
