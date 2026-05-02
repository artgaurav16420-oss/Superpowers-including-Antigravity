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
    content = content.replace(/\r\n/g, '\n');

    // MD009: Trailing spaces
    content = content.split('\n').map(line => line.trimEnd()).join('\n');

    let lines = content.split('\n');
    let newLines = [];
    let inFence = false;
    let inOrderedList = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let stripped = line.trim();

        // MD031 & MD040: Fences
        if (line.startsWith('```')) {
            if (!inFence) {
                // MD031: Blank line before fence
                if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
                    newLines.push('');
                }
                
                // MD040: Language tag
                if (line === '```') {
                    newLines.push('```text'); // Default to text
                } else {
                    newLines.push(line);
                }
                inFence = true;
            } else {
                newLines.push(line);
                
                // MD031: Blank line after fence
                if (i + 1 < lines.length && lines[i + 1].trim() !== '') {
                    newLines.push('');
                }
                inFence = false;
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
            inOrderedList = false;
            continue;
        }

        // MD029: Ordered List Prefixes (Style: 1/1/1)
        const orderedMatch = line.match(/^(\s*)(\d+)\.\s+(.*)/);
        if (orderedMatch) {
            const indent = orderedMatch[1];
            const text = orderedMatch[3];
            newLines.push(`${indent}1. ${text}`);
            inOrderedList = true;
            continue;
        }

        // Unordered List
        if (/^\s*([-*+])\s+/.test(line)) {
            newLines.push(line);
            inOrderedList = true;
            continue;
        }

        if (inOrderedList && stripped !== '' && !line.startsWith(' ')) {
             inOrderedList = false;
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

    // MD060: Table Alignment
    result = result.split('\n').map(line => {
        if (line.includes('|') && line.includes('---')) {
            return line.replace(/---/g, ':---');
        }
        return line;
    }).join('\n');

    // Final Cleanup
    result = result.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';

    fs.writeFileSync(filePath, result);
}

const skills = walk('.');
skills.forEach(fixMarkdown);
console.log(`\nSuccessfully mega-hardened v2 ${skills.length} files.`);
