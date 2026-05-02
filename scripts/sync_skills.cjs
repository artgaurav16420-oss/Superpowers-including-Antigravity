const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Portability: Use process.cwd() or similar if possible, 
// but for this repo it usually runs from root.
const rootDir = process.cwd();
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

console.log(`Checking symlink health for ${harnessPaths.length} harnesses...`);

harnessPaths.forEach(h => {
    const symlinkPath = path.join(rootDir, h.replace(/\//g, path.sep));
    const parentDir = path.dirname(symlinkPath);
    
    // Relative target calculation
    const depth = h.split('/').length - 1;
    const target = '../'.repeat(depth) + 'skills';

    if (!fs.existsSync(parentDir)) return; // Skip if harness base missing (e.g. .tabnine/agent if .tabnine missing)

    process.stdout.write(`Checking ${h}... `);

    let needsRepair = false;
    try {
        const stats = fs.lstatSync(symlinkPath);
        if (stats.isSymbolicLink()) {
            const currentTarget = fs.readlinkSync(symlinkPath);
            if (currentTarget !== target && currentTarget !== target.replace(/\//g, '\\')) {
                console.log(`target mismatch: ${currentTarget} != ${target}. Repairing.`);
                needsRepair = true;
            } else {
                console.log('OK');
            }
        } else {
            console.log('not a symlink. Converting.');
            needsRepair = true;
        }
    } catch (e) {
        console.log('missing. Creating.');
        needsRepair = true;
    }

    if (needsRepair) {
        try {
            if (fs.existsSync(symlinkPath) || fs.lstatSync(symlinkPath, { throwIfNoEntry: false })) {
                fs.rmSync(symlinkPath, { recursive: true, force: true });
            }
            fs.symlinkSync(target, symlinkPath, 'dir');
            console.log('Successfully created symlink.');
        } catch (err) {
            console.error(`Failed to create symlink for ${h}: ${err.message}`);
            // Fallback for Windows if Developer Mode is off
            try {
                console.log('Attempting Windows mklink fallback...');
                const winTarget = target.replace(/\//g, '\\');
                const winPath = symlinkPath.replace(/\//g, '\\');
                execSync(`cmd /c mklink /D "${winPath}" "${winTarget}"`, { stdio: 'ignore' });
                console.log('Success via mklink.');
            } catch (err2) {
                console.error(`Windows fallback failed. Some agents may not find skills until Developer Mode is enabled or running as Admin.`);
            }
        }
    }
});

console.log('\nMega-Sync complete. Repository structurally optimized.');
