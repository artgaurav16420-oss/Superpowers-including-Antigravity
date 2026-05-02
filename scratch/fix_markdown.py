import os
import re
import sys

def fix_markdown(filepath):
    print(f"Fixing {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Standardize to Unix newlines
    content = content.replace('\r\n', '\n')
    
    # MD009: Trailing spaces (only on lines, not empty lines)
    content = re.sub(r'[ \t]+(\n|$)', r'\1', content)

    lines = content.split('\n')
    new_lines = []
    in_fence = False
    in_list = False

    for i, line in enumerate(lines):
        stripped = line.strip()
        
        # Handle fences
        if line.startswith('```'):
            if not in_fence:
                # Starting a fence. Ensure blank line before.
                if len(new_lines) > 0 and new_lines[-1].strip() != '':
                    new_lines.append('')
                in_fence = True
                in_list = False # Fences end lists
            else:
                # Ending a fence.
                in_fence = False
            
            new_lines.append(line)
            
            # Ensure blank line after fence
            if not in_fence and i + 1 < len(lines) and lines[i+1].strip() != '':
                new_lines.append('')
            continue

        if in_fence:
            # Inside fence: do NOT add blank lines around headers or anything.
            new_lines.append(line)
            continue

        # Outside fence
        is_header = line.startswith('#')
        # Simple list detection
        is_list_item = re.match(r'^\s*([-*+]\s|\d+\.\s)', line)

        # Handle headers
        if is_header:
            if len(new_lines) > 0 and new_lines[-1].strip() != '':
                new_lines.append('')
            new_lines.append(line)
            if i + 1 < len(lines) and lines[i+1].strip() != '':
                new_lines.append('')
            in_list = False # Headers end lists
            continue

        # Handle lists
        if is_list_item:
            # If previous line was not empty and not another list item, add blank line
            if len(new_lines) > 0 and new_lines[-1].strip() != '' and not re.match(r'^\s*([-*+]\s|\d+\.\s)', new_lines[-1]):
                new_lines.append('')
            new_lines.append(line)
            in_list = True
            continue

        # Handle trailing blank line for lists
        if in_list and stripped != '':
            new_lines.append('')
            in_list = False

        # Regular line
        new_lines.append(line)

    content = '\n'.join(new_lines)
    
    # Cleanup: remove internal extra blank lines (more than 1)
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    # MD047: End with single newline
    content = content.rstrip() + '\n'

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Walk through all SKILL.md files
for root, dirs, files in os.walk('.'):
    for file in files:
        if file == 'SKILL.md':
            fix_markdown(os.path.join(root, file))
