const fs = require('fs');
const path = require('path');

function readIgnoreFile(ignoreFilePath) {
  if (!fs.existsSync(ignoreFilePath)) {
    return [];
  }

  const content = fs.readFileSync(ignoreFilePath, 'utf8');
  return content.split('\n').filter(line => line.trim() !== '');
}

function printFolderStructure(basePath, ignoreItems, prefix = '') {
  const filesAndFolders = fs.readdirSync(basePath);

  filesAndFolders.forEach((item, index) => {
    const fullPath = path.join(basePath, item);

    if (ignoreItems.includes(item) || ignoreItems.includes(fullPath)) {
      return;
    }

    const isLastItem = index === filesAndFolders.length - 1;
    console.log(`${prefix}${isLastItem ? '└─' : '├─'} ${item}`);

    if (fs.statSync(fullPath).isDirectory()) {
      printFolderStructure(fullPath, ignoreItems, prefix + (isLastItem ? '   ' : '│  '));
    }
  });
}

function main(folderPath) {
  const ignoreFilePath = path.join(folderPath, '.ignore');
  const ignoreItems = readIgnoreFile(ignoreFilePath);

  console.log(folderPath);
  printFolderStructure(folderPath, ignoreItems);
}

main('/Users/abito/Documents/GitHub/SmartHome-Gesture-Control-Application-');