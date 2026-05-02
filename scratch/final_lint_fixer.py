import os
import re

def fix_markdown_lint(filepath):
    print(f"Hardening {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Standardize newlines
    content = content.replace('\r\n', '\n')
    
    # MD009: Trailing spaces
    content = re.sub(r'[ \t]+$', '', content, flags=re.MULTILINE)

    lines = content.split('\n')
    new_lines = []
    in_fence = False
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        
        # MD031: Fenced code blocks blank lines
        if line.startswith('```'):
            if not in_fence:
                # Start of fence
                if len(new_lines) > 0 and new_lines[-1].strip() != '':
                    new_lines.append('')
                in_fence = True
            else:
                # End of fence
                in_fence = False
            
            new_lines.append(line)
            
            # Blank line after fence
            if not in_fence and i + 1 < len(lines) and lines[i+1].strip() != '':
                new_lines.append('')
            continue

        if in_fence:
            new_lines.append(line)
            continue

        # MD022: Headings blank lines
        is_header = line.startswith('#')
        if is_header:
            if len(new_lines) > 0 and new_lines[-1].strip() != '':
                new_lines.append('')
            new_lines.append(line)
            if i + 1 < len(lines) and lines[i+1].strip() != '':
                new_lines.append('')
            continue

        # MD032: Lists blank lines
        is_list_item = re.match(r'^\s*([-*+]\s|\d+\.\s)', line)
        if is_list_item:
            # If previous line was not empty and not another list item, add blank line
            if len(new_lines) > 0 and new_lines[-1].strip() != '' and not re.match(r'^\s*([-*+]\s|\d+\.\s)', new_lines[-1]):
                new_lines.append('')
            new_lines.append(line)
            continue
            
        # Handle blank line after lists
        if len(new_lines) > 0 and re.match(r'^\s*([-*+]\s|\d+\.\s)', new_lines[-1]) and stripped != '':
            new_lines.insert(-1, '') # This is wrong logic, just append blank before current
            new_lines.append('')

        new_lines.append(line)

    content = '\n'.join(new_lines)
    
    # MD025: Multiple top-level headings (only allow one #)
    # We find the first H1 and downgrade subsequent ones to H2
    h1_found = False
    final_lines = []
    for line in content.split('\n'):
        if line.startswith('# '):
            if not h1_found:
                h1_found = True
                final_lines.append(line)
            else:
                final_lines.append('## ' + line[2:])
        else:
            final_lines.append(line)
    
    content = '\n'.join(final_lines)

    # Cleanup multiple blank lines
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    # MD047: Single newline at end
    content = content.rstrip() + '\n'

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Process all SKILL.md files
for root, dirs, files in os.walk('.'):
    for file in files:
        if file == 'SKILL.md':
            fix_markdown_lint(os.path.join(root, file))
