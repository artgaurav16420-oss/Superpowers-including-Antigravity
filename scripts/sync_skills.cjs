const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = 'C:\\Users\\agaur\\OneDrive\\Desktop\\Superpowers';
const coreSkillsDir = path.join(rootDir, 'skills');

// Harnesses to process (Standard + Specific Deep Paths)
const harnessPaths = [
    ".adal/skills", ".agents/skills", ".aider-desk/skills", ".augment/skills", ".bob/skills",
    ".claude/skills", ".claude-plugin/skills", ".code-review-graph/skills", ".codeartsdoer/skills",
    ".codebuddy/skills", ".codemaker/skills", ".codestudio/skills", ".codex/skills",
    ".codex-plugin/skills", ".commandcode/skills", ".continue/skills", ".cortex/skills",
    ".crush/skills", ".cursor-plugin/skills", ".devin/skills", ".factory/skills",
    ".forge/skills", ".goose/skills", ".iflow/skills", ".junie/skills", ".kilocode/skills",
    ".kiro/skills", ".kode/skills", ".mcpjam/skills", ".mux/skills", ".neovate/skills",
    ".opencode/skills", ".openhands/skills", ".pi/skills", ".pochi/skills", ".qoder/skills",
    ".qwen/skills", ".roo/skills", ".rovodev/skills", ".tabnine/skills", ".tabnine/agent/skills",
    ".trae/skills", ".vibe/skills", ".windsurf/skills", ".zencoder/skills"
];

function syncWithLinks(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            syncWithLinks(srcPath, destPath);
        } else {
            try {
                if (fs.existsSync(destPath)) {
                    // Skip if already hard linked (checked via stat)
                    const srcStat = fs.statSync(srcPath);
                    const destStat = fs.statSync(destPath);
                    if (srcStat.ino === destStat.ino) continue; 
                    
                    fs.unlinkSync(destPath);
                }
                process.stdout.write(`.`);
                execSync(`cmd /c mklink /H "${destPath}" "${srcPath}"`, { stdio: 'ignore' });
            } catch (e) {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
}

console.log(`Starting Mega-Sync for ${harnessPaths.length} harnesses...`);

harnessPaths.forEach(h => {
    const dest = path.join(rootDir, h.replace(/\//g, path.sep));
    if (!fs.existsSync(path.dirname(dest))) return; // Skip if harness base missing
    
    console.log(`\nSyncing ${h}...`);
    syncWithLinks(coreSkillsDir, dest);
});

console.log('\n\nMega-Sync complete. Repository physically optimized.');
