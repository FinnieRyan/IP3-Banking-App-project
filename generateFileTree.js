import fs from 'fs';
import path from 'path';

const generateFileTree = (dir, prefix = '') => {
  const files = fs.readdirSync(dir);

  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    const isLast = index === files.length - 1;

    if (file === 'node_modules' || file === '.husky' || file === '.git') {
      return; // Skip the node_modules and .husky directories
    }

    console.log(`${prefix}${isLast ? '└── ' : '├── '}${file}`);

    if (fs.statSync(filePath).isDirectory()) {
      generateFileTree(filePath, `${prefix}${isLast ? '    ' : '│   '}`);
    }
  });
};

const dir = process.argv[2] || '.';
console.log(dir);
generateFileTree(dir);
