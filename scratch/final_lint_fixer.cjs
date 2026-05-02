const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                results = results.concat(walk(filePath));
            }
        } else if (file === 'SKILL.md') {
            results.push(filePath);
        }
    });
    return results;
}

function fixMarkdown(filePath) {
    console.log(`Hardening ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');

    // Standardize newlines
    content = content.replace(/\r\n/g, '\n');

    // MD009: Trailing spaces
    content = content.split('\n').map(line => line.trimEnd()).join('\n');

    const lines = content.split('\n');
    const newLines = [];
    let inFence = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const stripped = line.trim();

        // MD031: Fences
        if (line.startsWith('```')) {
            if (!inFence) {
                if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
                    newLines.push('');
                }
                inFence = true;
            } else {
                inFence = false;
            }
            newLines.push(line);
            if (!inFence && i + 1 < lines.length && lines[i + 1].trim() !== '') {
                newLines.push('');
            }
            continue;
        }

        if (inFence) {
            newLines.push(line);
            continue;
        }

        // MD022: Headings
        if (line.startsWith('#')) {
            if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
                newLines.push('');
            }
            newLines.push(line);
            if (i + 1 < lines.length && lines[i + 1].trim() !== '') {
                newLines.push('');
            }
            continue;
        }

        // MD032: Lists
        const isListItem = /^\s*([-*+]\s|\d+\.\s)/.test(line);
        if (isListItem) {
            const prevLine = newLines.length > 0 ? newLines[newLines.length - 1] : '';
            if (prevLine.trim() !== '' && !/^\s*([-*+]\s|\d+\.\s)/.test(prevLine)) {
                newLines.push('');
            }
            newLines.push(line);
            continue;
        }

        // Blank line after list
        if (newLines.length > 0 && /^\s*([-*+]\s|\d+\.\s)/.test(newLines[newLines.length - 1]) && stripped !== '') {
            newLines.push('');
        }

        newLines.push(line);
    }

    let result = newLines.join('\n');

    // MD025: Multiple H1s
    let h1Found = false;
    result = result.split('\n').map(line => {
        if (line.startsWith('# ')) {
            if (!h1Found) {
                h1Found = true;
                return line;
            } else {
                return '## ' + line.substring(2);
            }
        }
        return line;
    }).join('\n');

    // Cleanup
    result = result.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';

    fs.writeFileSync(filePath, result);
}

const skills = walk('.');
skills.forEach(fixMarkdown);
console.log(`\nSuccessfully remediated ${skills.length} files.`);
