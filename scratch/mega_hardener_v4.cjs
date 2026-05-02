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

    let lines = content.split('\n');
    let newLines = [];
    let inFence = false;
    let inBlockquote = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let stripped = line.trim();
        let isBlockquoteLine = line.startsWith('>');

        // MD031 & MD040: Fences (including blockquoted ones)
        const fenceMatch = line.match(/^(\s*|>+\s*)```(.*)/);
        if (fenceMatch) {
            const prefix = fenceMatch[1];
            const tag = fenceMatch[2].trim();
            
            if (!inFence) {
                // Blank line before
                if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
                    newLines.push(isBlockquoteLine ? '>' : '');
                }
                
                // Add tag if missing
                newLines.push(`${prefix}\`\`\`${tag || 'text'}`);
                inFence = true;
            } else {
                newLines.push(line);
                // Blank line after
                if (i + 1 < lines.length && lines[i + 1].trim() !== '') {
                    newLines.push(isBlockquoteLine ? '>' : '');
                }
                inFence = false;
            }
            continue;
        }

        if (inFence) {
            newLines.push(line);
            continue;
        }

        // MD028: Blockquote continuity
        if (isBlockquoteLine) {
            inBlockquote = true;
        } else if (stripped === '' && inBlockquote) {
            // Check if next line is a blockquote. If so, this line must have >
            let foundNext = false;
            for (let k = i + 1; k < lines.length; k++) {
                if (lines[k].trim() !== '') {
                    if (lines[k].startsWith('>')) foundNext = true;
                    break;
                }
            }
            if (foundNext) {
                newLines.push('>');
                continue;
            } else {
                inBlockquote = false;
            }
        } else {
            inBlockquote = false;
        }

        // Standard rules (Headings, Lists, etc.)
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

        const orderedMatch = line.match(/^(\s*)(\d+)\.\s+(.*)/);
        if (orderedMatch) {
            newLines.push(`${orderedMatch[1]}1. ${orderedMatch[3]}`);
            continue;
        }

        newLines.push(line);
    }

    let result = newLines.join('\n');

    // MD025
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

    // MD060
    result = result.split('\n').map(line => {
        if (line.includes('|') && line.includes('---')) {
            return line.replace(/---/g, ':---');
        }
        return line;
    }).join('\n');

    result = result.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
    fs.writeFileSync(filePath, result);
}

const rootDir = 'C:\\Users\\agaur\\OneDrive\\Desktop\\Superpowers';
const skills = walk(rootDir);
skills.forEach(fixMarkdown);
console.log(`Successfully mega-hardened v4 ${skills.length} files.`);
