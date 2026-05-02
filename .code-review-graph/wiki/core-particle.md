# core-particle

## Overview

Community of 15 nodes

- **Size**: 15 nodes
- **Cohesion**: 0.2958
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| Particle | Class | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 16-103 |
| __init__ | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 19-43 |
| update | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 45-57 |
| is_alive | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 59-61 |
| get_alpha | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 63-65 |
| render | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 67-103 |
| ParticleSystem | Class | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 106-210 |
| __init__ | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 109-111 |
| emit | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 113-141 |
| emit_confetti | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 143-169 |
| emit_sparkles | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 171-192 |
| update | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 194-201 |
| render | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 203-206 |
| get_particle_count | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py | 208-210 |
| create_particle_burst | Function | C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\templates\explode.py | 240-293 |

## Execution Flows

- **create_particle_burst** (criticality: 0.51, depth: 1)
- **render** (criticality: 0.37, depth: 2)
- **render** (criticality: 0.36, depth: 1)
- **emit** (criticality: 0.36, depth: 1)
- **emit_confetti** (criticality: 0.36, depth: 1)
- **emit_sparkles** (criticality: 0.36, depth: 1)
- **update** (criticality: 0.16, depth: 1)

## Dependencies

### Outgoing

- `uniform` (11 edge(s))
- `range` (5 edge(s))
- `append` (4 edge(s))
- `choice` (4 edge(s))
- `int` (3 edge(s))
- `max` (2 edge(s))
- `cos` (2 edge(s))
- `sin` (2 edge(s))
- `randint` (2 edge(s))
- `min` (1 edge(s))
- `Draw` (1 edge(s))
- `tuple` (1 edge(s))
- `ellipse` (1 edge(s))
- `rectangle` (1 edge(s))
- `line` (1 edge(s))

### Incoming

- `C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\core\visual_effects.py` (2 edge(s))
- `C:\Users\agaur\OneDrive\Desktop\Mega-Skills\skills\slack-gif-creator\templates\explode.py` (1 edge(s))
