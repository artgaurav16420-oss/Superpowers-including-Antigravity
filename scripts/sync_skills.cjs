const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\agaur\\OneDrive\\Desktop\\Superpowers';
const coreSkillsDir = path.join(rootDir, 'skills');

// Find all directories starting with . (excluding .git)
const harnesses = fs.readdirSync(rootDir).filter(file => {
    const filePath = path.join(rootDir, file);
    return fs.statSync(filePath).isDirectory() && file.startsWith('.') && file !== '.git' && file !== '.github';
});

console.log(`Found ${harnesses.length} potential harnesses for synchronization.`);

function syncDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            syncDir(srcPath, destPath);
        } else {
            // Only sync if file is different or missing
            if (!fs.existsSync(destPath) || fs.readFileSync(srcPath).compare(fs.readFileSync(destPath)) !== 0) {
                console.log(`Syncing ${entry.name} to ${path.relative(rootDir, destPath)}`);
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
}

harnesses.forEach(harness => {
    const harnessSkillsDir = path.join(rootDir, harness, 'skills');
    if (fs.existsSync(harnessSkillsDir)) {
        console.log(`\n--- Syncing to ${harness} ---`);
        syncDir(coreSkillsDir, harnessSkillsDir);
    }
});

console.log('\nSynchronization complete.');
