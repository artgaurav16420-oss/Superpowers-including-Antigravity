const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\agaur\\OneDrive\\Desktop\\Superpowers';
const coreSkillsDir = path.join(rootDir, 'skills');

const harnesses = [
    ".adal\\skills", ".agents\\skills", ".aider-desk\\skills", ".augment\\skills", ".bob\\skills",
    ".claude\\skills", ".claude-plugin\\skills", ".code-review-graph\\skills", ".codeartsdoer\\skills",
    ".codebuddy\\skills", ".codemaker\\skills", ".codestudio\\skills", ".codex\\skills",
    ".codex-plugin\\skills", ".commandcode\\skills", ".continue\\skills", ".cortex\\skills",
    ".crush\\skills", ".cursor-plugin\\skills", ".devin\\skills", ".factory\\skills",
    ".forge\\skills", ".goose\\skills", ".iflow\\skills", ".junie\\skills", ".kilocode\\skills",
    ".kiro\\skills", ".kode\\skills", ".mcpjam\\skills", ".mux\\skills", ".neovate\\skills",
    ".opencode\\skills", ".openhands\\skills", ".pi\\skills", ".pochi\\skills", ".qoder\\skills",
    ".qwen\\skills", ".roo\\skills", ".rovodev\\skills", ".tabnine\\skills", ".tabnine\\agent\\skills",
    ".trae\\skills", ".vibe\\skills", ".windsurf\\skills", ".zencoder\\skills"
];

let batchContent = '@echo off\n';

function collectLinks(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            collectLinks(srcPath, destPath);
        } else {
            // Generate batch command
            batchContent += `del "${destPath}" 2>nul\n`;
            batchContent += `mklink /H "${destPath}" "${srcPath}"\n`;
        }
    }
}

harnesses.forEach(h => {
    const dest = path.join(rootDir, h);
    if (dest === coreSkillsDir) return;
    console.log(`Collecting links for ${h}...`);
    collectLinks(coreSkillsDir, dest);
});

fs.writeFileSync(path.join(rootDir, 'scratch', 'link_all.bat'), batchContent);
console.log('Batch file generated in scratch/link_all.bat');
