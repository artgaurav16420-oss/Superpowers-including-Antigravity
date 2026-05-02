import os

def clean_fences(filepath):
    print(f"Cleaning {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    in_fence = False
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('```'):
            in_fence = not in_fence
            new_lines.append(line)
            continue
        
        if in_fence and not stripped:
            continue
            
        new_lines.append(line)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

for root, dirs, files in os.walk('.'):
    for file in files:
        if file == 'SKILL.md':
            clean_fences(os.path.join(root, file))
