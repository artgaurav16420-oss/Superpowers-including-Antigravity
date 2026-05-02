const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\agaur\\OneDrive\\Desktop\\Superpowers\\skills\\algorithmic-art\\SKILL.md';
let content = fs.readFileSync(filePath, 'utf8');
let lines = content.split(/\r?\n/);

lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        console.log(`Line ${i+1}: "${line}"`);
        const match = trimmed.match(/^\*\*([^*]+)\*\*$/);
        if (match) {
            console.log(`  MATCH: ${match[1]}`);
        } else {
            console.log(`  NO MATCH`);
        }
    }
});
