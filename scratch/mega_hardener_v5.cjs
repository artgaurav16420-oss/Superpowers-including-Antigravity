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
    let frontmatterEnd = -1;
    let skillName = '';

    // Parse frontmatter
    if (lines[0] === '---') {
        for (let j = 1; j < lines.length; j++) {
            if (lines[j].startsWith('name:')) {
                skillName = lines[j].replace('name:', '').trim();
            }
            if (lines[j] === '---') {
                frontmatterEnd = j;
                break;
            }
        }
    }

    // MD041: Check for H1 after frontmatter
    let firstContentLineIndex = frontmatterEnd + 1;
    while (firstContentLineIndex < lines.length && lines[firstContentLineIndex].trim() === '') {
        firstContentLineIndex++;
    }

    if (firstContentLineIndex < lines.length && !lines[firstContentLineIndex].startsWith('# ')) {
        // Missing H1! Insert one based on skillName
        const h1 = `# ${skillName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}`;
        lines.splice(firstContentLineIndex, 0, h1, '');
    }

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let stripped = line.trim();
        let isBlockquoteLine = line.startsWith('>');

        const fenceMatch = line.match(/^(\s*|>+\s*)```(.*)/);
        if (fenceMatch) {
            const prefix = fenceMatch[1];
            const tag = fenceMatch[2].trim();
            if (!inFence) {
                if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
                    newLines.push(isBlockquoteLine ? '>' : '');
                }
                newLines.push(`${prefix}\`\`\`${tag || 'text'}`);
                inFence = true;
            } else {
                newLines.push(line);
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

        if (isBlockquoteLine) {
            inBlockquote = true;
        } else if (stripped === '' && inBlockquote) {
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

    // MD034: Bare URLs remediation
    result = result.split('\n').map(line => {
        // Skip code fences (already handled by inFence logic if I split earlier, but here we process the final string)
        // This regex wraps bare http/https URLs that aren't already in <> or []
        // We avoid wrapping if it's inside ` ` by checking for backticks (simple heuristic)
        if (line.includes('`')) return line; 
        return line.replace(/(?<![<\[])(https?:\/\/[^\s>\]]+)(?![>\]])/g, '[$1]($1)');
    }).join('\n');

    // MD036: No emphasis as heading remediation
    result = result.split('\n').map(line => {
        const trimmed = line.trim();
        // Skip list items, headings, and empty lines
        if (trimmed === '' || trimmed.startsWith('-') || trimmed.startsWith('*') || trimmed.startsWith('#')) return line;
        
        // Match **Text** with optional spaces
        const boldHeadingMatch = line.trim().match(/^\*\*([^*]+)\*\*$/);
        if (boldHeadingMatch) {
            const indent = line.match(/^(\s*)/)[0];
            console.log(`  Converting bold heading: ${line.trim()}`);
            return `${indent}#### ${boldHeadingMatch[1]}`;
        }
        return line;
    }).join('\n');

    result = result.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
    fs.writeFileSync(filePath, result);
}

const rootDir = 'C:\\Users\\agaur\\OneDrive\\Desktop\\Superpowers';
const skills = walk(rootDir);
skills.forEach(fixMarkdown);
console.log(`Successfully mega-hardened v5 ${skills.length} files.`);
