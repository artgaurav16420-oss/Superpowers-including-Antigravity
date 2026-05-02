const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (path.basename(file) === 'SKILL.md') {
                results.push(file);
            }
        }
    });
    return results;
}

const skills = walk('.');

skills.forEach(file => {
    console.log(`Cleaning ${file}`);
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split(/\r?\n/);
    const newLines = [];
    let inFence = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('```')) {
            inFence = !inFence;
            newLines.push(line);
            continue;
        }

        if (inFence && line.trim() === '') {
            continue;
        }

        newLines.push(line);
    }

    fs.writeFileSync(file, newLines.join('\n'));
});
