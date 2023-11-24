import * as fs from 'fs';
import * as path from 'path';

import { mainFiles } from './mainFiles';
import { mainFolders } from './mainFolders';
import { srcContent, srcContentType } from './srcContent';


// first create main folders
const createMainFolders = async () => {
  for (let i = 0; i < mainFolders.length; i++) {
    const folder = mainFolders[i];
    if (!fs.existsSync(folder.name)) {
      fs.mkdirSync(folder.name, { recursive: true });
      if (folder.subFiles.length > 0) {
        for (let index = 0; index < folder.subFiles.length; index++) {
          const subFile = folder.subFiles[index];
          const filePath = path.join(folder.name, subFile.name);
          fs.writeFileSync(filePath, subFile.content);
        }
      }
    }
  }
};

// second create main files
const createMainFiles = async () => {
  for (let i = 0; i < mainFiles.length; i++) {
    const file = mainFiles[i];
    if (!fs.existsSync(file.name)) {
      fs.writeFileSync(file.name, file.content);
    }
  }
}

// third create src and src folders
const createSrcFolders = async () => {
  for (let i = 0; i < srcContent.length; i++) {
    const srcFolder: srcContentType = srcContent[i];

    if (srcFolder.type === 'folder') {
      // path included folder name
      const fullPath = path.join('src', srcFolder.name);

      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });

        if (srcFolder.subFolders && srcFolder.subFolders.length > 0) {
          for (let j = 0; j < srcFolder.subFolders.length; j++) {
            const subFolder = srcFolder.subFolders[j];
            const newPath = path.join(fullPath, subFolder);
            fs.mkdirSync(newPath, { recursive: true });
          }
        };

        if (srcFolder.subFiles && srcFolder.subFiles.length > 0) {
          for (let k = 0; k < srcFolder.subFiles.length; k++) {
            const subFile = srcFolder.subFiles[k];
            const filePath = path.join(fullPath, subFile.name);
            fs.writeFileSync(filePath, subFile.content);
          }
        }
      }
    } else if (srcFolder.type === 'file' && srcFolder.content) {
      const filePath = path.join('src', srcFolder.name);
      fs.writeFileSync(filePath, srcFolder.content);
    }
  }
};




const createInitialCode = async () => {
  try {
    await createMainFolders();
    await createMainFiles();
    await createSrcFolders();
    console.log(`Initial Code Created successfully`);
  } catch (error: any) {
    console.log('Error Accrued' + error)
  }
};

// CALLING TO INITIALIZE
createInitialCode();
