---
name: elite-pptx
description: "The ultimate AI presentation engine. Uses a multi-stage SVG-to-DrawingML pipeline to produce cinematic, Kimi-style, natively editable PowerPoint slides with professional transitions and animations."
---

# Elite PPTX (Beast Mode)

This is the flagship presentation skill of Mega-Skills. It leverages an advanced SVG-to-PPTX conversion engine to bridge the gap between AI design and native PowerPoint editability.

## The Designer Pipeline

This workflow is a strict serial pipeline. Do not skip stages.

### 1. Strategist Phase (Planning)
- **Visual Vibe**: Define the Color Palette, Typography pairings, and Iconography style.
- **Rhythm Mapping**: Plan the "Page Rhythm" (Anchor slides, Dense data slides, and Breathing space).
- **Confirmation**: Present the "Eight Confirmations" (Format, Style, Palette, etc.) and wait for user approval.

### 2. SVG Design Phase (Execution)
- **Designer Logic**: Generate high-fidelity SVG code for every slide.
- **Precision**: Use SVG to define pixel-perfect layering, gradients, and geometric depth.
- **Sequential Generation**: Generate slides one-by-one to maintain visual consistency.

### 3. Native Export (Conversion)
- **DrawingML Engine**: Translate SVG designs into native PowerPoint objects.
- **Fidelity**: Ensure all text remains editable and all shapes remain vectors.

## Technical Workflows

### Project Management
```bash
# Initialize a new high-fidelity project
python3 scripts/project_manager.py init <name> --format ppt169

# Import sources (PDF, Word, Markdown)
python3 scripts/project_manager.py import-sources <project_path> <files...> --move
```

### Conversion & Export
```bash
# Finalize designs and embed assets
python3 scripts/finalize_svg.py <project_path>

# Export to native PPTX with animations
python3 scripts/svg_to_pptx.py <project_path> -s final -t fade -a mixed
```

## Rules

- **Serial Execution**: You MUST complete the Strategist Phase before generating a single SVG.
- **Spec Lock**: Before designing each slide, re-read `<project_path>/spec_lock.md`. Never invent design values from memory.
- **Bilingual Balance**: For bilingual decks, use the "Parallel Card" layout to ensure neither language dominates the visual weight.
- **No Sub-Agents for SVG**: The main agent MUST handle the SVG generation to maintain design context.

## Red Flags

| Thought | Reality |
| :--- | :--- |
| "I'll generate all 10 SVGs in one block" | **STOP.** Violates Sequential Generation rule. Generate one by one to avoid context drift. |
| "I'll use basic text boxes for the design" | **STOP.** Use the "Component-based" logic. Encapsulate info in cards with shadows and borders. |
| "I'll skip the Strategist confirmation" | **STOP.** Hallucinated design leads to rejection. Confirm the "Vibe" with the user first. |

## The Iron Law

**Presentation is 90% Design, 10% Text. If the SVG doesn't look like a professional UI component, it is not ready for export.**

---
Source: Integrated from hugohe3/ppt-master (Elite Engine)
