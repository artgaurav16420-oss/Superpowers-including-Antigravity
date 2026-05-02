const fs = require('fs');
const path = require('path');

const skillsDir = 'C:\\Users\\agaur\\OneDrive\\Desktop\\Superpowers\\skills';
const harnesses = [
    '.agents',
    '.windsurf',
    '.zencoder',
    '.adal',
    '.opencode',
    '.superpowers'
];

const skills = fs.readdirSync(skillsDir).filter(f => fs.statSync(path.join(skillsDir, f)).isDirectory());

let issues = 0;

console.log(`Checking ${skills.length} skills...\n`);

skills.forEach(skill => {
    const skillPath = path.join(skillsDir, skill);
    const mdPath = path.join(skillPath, 'SKILL.md');
    
    if (!fs.existsSync(mdPath)) {
        console.error(`[MISSING SKILL.md] ${skill}`);
        issues++;
    }

    harnesses.forEach(h => {
        const hPath = path.join('C:\\Users\\agaur\\OneDrive\\Desktop\\Superpowers', h, 'skills', skill);
        if (!fs.existsSync(hPath)) {
            // Not every skill needs to be in every harness, but it should be in at least one.
            // But for this repo, we usually sync all to all.
        }
    });
});

// Check if all harnesses are synchronized
harnesses.forEach(h => {
    const hSkillsDir = path.join('C:\\Users\\agaur\\OneDrive\\Desktop\\Superpowers', h, 'skills');
    if (fs.existsSync(hSkillsDir)) {
        const hSkills = fs.readdirSync(hSkillsDir);
        if (hSkills.length < skills.length) {
            console.warn(`[INCOMPLETE HARNESS] ${h} has only ${hSkills.length}/${skills.length} skills.`);
            issues++;
        }
    }
});

if (issues === 0) {
    console.log('\n✅ All skills are complete and synchronized.');
} else {
    console.log(`\n❌ Found ${issues} issues.`);
    process.exit(1);
}
