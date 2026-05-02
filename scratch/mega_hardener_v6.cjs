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
        } else if (file.toLowerCase().endsWith('.md')) {
            results.push(filePath);
        }
    });
    return results;
}

function fixMarkdown(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split('\n');
    let newLines = [];
    let inFence = false;
    let fencePrefix = '';
    let inBlockquote = false;
    let frontmatterEnd = -1;
    let skillName = '';
    
    // MD001/MD024 Tracking
    let lastLevel = 0;
    const headingCounts = new Map();
    let h1Found = false;

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

    // MD041: Check for H1 after frontmatter (Only for SKILL.md)
    if (path.basename(filePath) === 'SKILL.md') {
        let firstContentLineIndex = frontmatterEnd + 1;
        while (firstContentLineIndex < lines.length && lines[firstContentLineIndex].trim() === '') {
            firstContentLineIndex++;
        }

        if (firstContentLineIndex < lines.length && !lines[firstContentLineIndex].startsWith('# ')) {
            const h1 = `# ${skillName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}`;
            lines.splice(firstContentLineIndex, 0, h1, '');
        }
    }

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let stripped = line.trim();

        // MD031/MD040: Fences
        const fenceMatch = line.match(/^(\s*|>+\s*)```(.*)/);
        if (fenceMatch) {
            const prefix = fenceMatch[1];
            const tag = fenceMatch[2].trim();
            if (!inFence) {
                fencePrefix = prefix.includes('>') ? '>' : '';
                if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
                    newLines.push(fencePrefix);
                }
                newLines.push(`${prefix}\`\`\`${tag || 'text'}`);
                inFence = true;
            } else {
                newLines.push(`${prefix}\`\`\``);
                if (i + 1 < lines.length && lines[i + 1].trim() !== '') {
                    newLines.push(fencePrefix);
                }
                inFence = false;
                fencePrefix = '';
            }
            continue;
        }

        if (inFence) {
            if (fencePrefix && !line.startsWith(fencePrefix)) {
                newLines.push(`${fencePrefix} ${line}`);
            } else {
                newLines.push(line);
            }
            continue;
        }

        // --- OUTSIDE FENCE ---

        // MD009: Trailing spaces
        line = line.trimEnd();

        // Heading Processing (MD001, MD024, MD025, MD026)
        if (line.trim().startsWith('#')) {
            let processedLine = line.trim();
            
            // MD026: Strip trailing punctuation
            processedLine = processedLine.replace(/[:.!?;]+$/, '');

            const headingMatch = processedLine.match(/^(#+)(\s+|$)/);
            if (headingMatch) {
                let level = headingMatch[1].length;
                let contentText = processedLine.substring(headingMatch[1].length).trim();

                // MD025: Single H1
                if (level === 1) {
                    if (h1Found) {
                        level = 2; // Downgrade duplicate H1
                    } else {
                        h1Found = true;
                    }
                }

                // MD001: Heading increment
                if (level > lastLevel + 1 && lastLevel !== 0) {
                    level = lastLevel + 1;
                }
                lastLevel = level;

                // MD024: Unique headings
                const count = headingCounts.get(contentText) || 0;
                if (count > 0 && level > 1) { // Only suffix sub-headings
                    headingCounts.set(contentText, count + 1);
                    contentText = `${contentText} (${count + 1})`;
                } else {
                    headingCounts.set(contentText, 1);
                }

                newLines.push(`${'#'.repeat(level)} ${contentText}`);
                continue;
            }
        }

        // MD034: Bare URLs (only if not in backticks)
        if (!line.includes('`')) {
            line = line.replace(/(?<![<\[])(https?:\/\/[^\s>\]]+)(?![>\]])/g, '[$1]($1)');
        }

        // MD033: details/summary
        if (line.includes('<details>') && line.includes('<summary>')) {
            line = line.replace(/<details>\s*<summary>(.*?)<\/summary>/gs, '> **$1**\n>');
        }
        line = line.replace(/<\/details>/g, '');

        // MD028: Blockquote gaps
        if (line.trim() === '>' && newLines.length > 0 && newLines[newLines.length - 1].trim() === '>') {
            continue;
        }

        // MD060: Ordered list normalization
        const orderedMatch = line.match(/^(\s*)(\d+)\.\s+(.*)/);
        if (orderedMatch) {
            newLines.push(`${orderedMatch[1]}1. ${orderedMatch[3]}`);
            continue;
        }

        // MD060: Bullet list normalization
        if (line.match(/^(\s*)([-*+])\s+/)) {
            newLines.push(line.replace(/^(\s*)([-*+])\s+/, '$11. '));
            continue;
        }

        newLines.push(line);
    }

    let finalResult = newLines.join('\n');
    
    // Table alignment (MD060-ish)
    finalResult = finalResult.split('\n').map(line => {
        if (line.includes('|') && line.includes('---')) {
            return line.replace(/---/g, ':---');
        }
        return line;
    }).join('\n');

    finalResult = finalResult.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
    fs.writeFileSync(filePath, finalResult);
}

const rootDir = 'C:\\Users\\agaur\\OneDrive\\Desktop\\Superpowers';
const skills = walk(rootDir);
skills.forEach(fixMarkdown);
console.log(`Successfully mega-hardened v6 ${skills.length} files.`);
