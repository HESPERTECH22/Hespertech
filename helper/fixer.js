// nvm use 20
const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function replaceEmDashInDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            replaceEmDashInDir(fullPath);
        } else if (entry.isFile() && fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            const newContent = content.replace(/ —/g, ',');
            if (newContent !== content) {
                fs.writeFileSync(fullPath, newContent, 'utf-8');
                console.log(`Replaced em dashes in ${fullPath}`);
            }
        }
    }
}

replaceEmDashInDir(__dirname);