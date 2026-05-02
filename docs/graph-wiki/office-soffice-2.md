# office-soffice

## Overview

Community of 6 nodes

- **Size**: 6 nodes
- **Cohesion**: 0.1463
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| accept_changes | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\docx\scripts\accept_changes.py | 36-88 |
| _setup_libreoffice_macro | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\docx\scripts\accept_changes.py | 91-118 |
| get_soffice_env | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\docx\scripts\office\soffice.py | 24-32 |
| run_soffice | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\docx\scripts\office\soffice.py | 35-37 |
| _needs_shim | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\docx\scripts\office\soffice.py | 44-50 |
| _ensure_shim | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\docx\scripts\office\soffice.py | 53-65 |

## Execution Flows

- **accept_changes** (criticality: 0.45, depth: 2)
- **run_soffice** (criticality: 0.37, depth: 2)

## Dependencies

### Outgoing

- `Path` (4 edge(s))
- `exists` (4 edge(s))
- `run` (4 edge(s))
- `str` (3 edge(s))
- `mkdir` (2 edge(s))
- `write_text` (2 edge(s))
- `read_text` (1 edge(s))
- `warning` (1 edge(s))
- `lower` (1 edge(s))
- `copy2` (1 edge(s))
- `absolute` (1 edge(s))
- `gettempdir` (1 edge(s))
- `unlink` (1 edge(s))
- `socket` (1 edge(s))
- `close` (1 edge(s))

### Incoming

- `C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\docx\scripts\office\soffice.py` (4 edge(s))
- `C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\docx\scripts\accept_changes.py` (2 edge(s))
