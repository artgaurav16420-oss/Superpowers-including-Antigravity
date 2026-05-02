# Mega-Skills

**Mega-Skills** is the ultimate software development methodology for coding agents. It combines the structured workflow of the original **Mega-Skills** system with the high-utility skill libraries from **Anthropic** and **Composio**.

It is a complete software development methodology for your coding agents, built on top of a set of composable skills and some initial instructions that make sure your agent uses them.

## How it works

It starts from the moment you fire up your coding agent. As soon as it sees that you're building something, it *doesn't* just jump into trying to write code. Instead, it steps back and asks you what you're really trying to do.

Once it's teased a spec out of the conversation, it shows it to you in chunks short enough to actually read and digest.

After you've signed off on the design, your agent puts together an implementation plan that's clear enough for an enthusiastic junior engineer with poor taste, no judgement, no project context, and an aversion to testing to follow. It emphasizes true red/green TDD, YAGNI (You Aren't Gonna Need It), and DRY.

Next up, once you say "go", it launches a *subagent-driven-development* process, having agents work through each engineering task, inspecting and reviewing their work, and continuing forward. It's not uncommon for Claude to be able to work autonomously for a couple hours at a time without deviating from the plan you put together.

There's a bunch more to it, but that's the core of the system. And because the skills trigger automatically, you don't need to do anything special. Your coding agent just has **Mega-Skills**.

## Sponsorship

If Mega-Skills has helped you do stuff that makes money and you are so inclined, I'd greatly appreciate it if you'd consider [sponsoring Gaurav's work](https://github.com/artgaurav16420-oss).

## Installation

**Note:** Installation differs by platform.

### Antigravity (Native Support)

```bash
antigravity extension install https://github.com/artgaurav16420-oss/Mega-Skills
```

To update:

```bash
antigravity extension update mega-mega-skills
```

### Gemini CLI

```bash
gemini extensions install https://github.com/artgaurav16420-oss/Mega-Skills
```

### Claude Code

```bash
/plugin install mega-mega-skills@https://github.com/artgaurav16420-oss/Mega-Skills
```

### OpenCode

Tell OpenCode:

```bash
Fetch and follow instructions from https://raw.githubusercontent.com/artgaurav16420-oss/Mega-Skills/refs/heads/main/.opencode/INSTALL.md
```

### GitHub Copilot CLI

```bash
copilot plugin install mega-mega-skills@https://github.com/artgaurav16420-oss/Mega-Skills
```

## The Basic Workflow

1. **brainstorming** - Activates before writing code. Refines rough ideas through questions, explores alternatives, presents design for validation.
2. **sequential-thinking** - Activates for complex logic. Forces a multi-step reasoning loop to explore hypotheses and edge cases before acting.
3. **using-git-worktrees** - Activates after design approval. Creates isolated workspace on new branch, runs setup, verifies clean test baseline.
4. **writing-plans** - Activates with approved design. Breaks work into bite-sized tasks. Every task has file paths, complete code, and verification steps.
5. **memory-management** - Continuous activation. Persists critical decisions, task state, and discovery results to prevent context loss.
6. **subagent-driven-development** - Dispatches fresh subagents per task with two-stage review (spec compliance, then code quality).
7. **test-driven-development** - Enforces RED-GREEN-REFACTOR: write failing test, watch it fail, write minimal code, watch it pass, commit.
8. **requesting-code-review** - Reviews against plan, reports issues by severity. Critical issues block progress.
9. **finishing-a-development-branch** - Verifies tests, presents merge options, and cleans up the worktree.

**The agent checks for relevant skills before any task.** Mandatory workflows, not suggestions.

## Complete Skills Index

The full library contains 62 composable skills, ordered by utility:

### 🛠️ Core Methodology (The Mega-Skills)

- **test-driven-development** - RED-GREEN-REFACTOR cycle: write tests first
- **writing-plans** - Detailed implementation planning and task breakdown
- **brainstorming** - Socratic design and spec refinement
- **subagent-driven-development** - Autonomous task completion via subagents
- **sequential-thinking** - Deep reasoning loop for complex problem solving
- **memory-management** - State persistence and context optimization
- **systematic-debugging** - 4-phase root cause analysis and fixing
- **using-git-worktrees** - Isolated development environments
- **verification-before-completion** - Final fix validation
- **finishing-a-development-branch** - Merge and cleanup workflow
- **receiving-code-review** & **requesting-code-review** - PR workflow

### 🏗️ Advanced Developer Tools

- **browser-automation** - Web interaction and UI verification
- **mcp-builder** - Model Context Protocol server creation assistant
- **claude-api** - Anthropic SDK and prompt optimization
- **webapp-testing** - Playwright-based frontend testing
- **web-artifacts-builder** - Advanced shadcn/ui and React artifacts
- **artifacts-builder** - Build complex React/Tailwind artifacts
- **langsmith-fetch** - Debugging agent traces and performance
- **skill-creator** & **writing-skills** - Authoring new agent capabilities

### 📄 Document & Data Processing

- **pdf**, **docx**, **pptx**, **xlsx** - Professional document manipulation
- **invoice-organizer** - Automated receipt and invoice management
- **file-organizer** - Intelligent asset and folder management

### 🔌 Integrations & Research

- **connect** & **connect-apps** - Integration with 1000+ external services
- **lead-research-assistant** - Sales and lead generation automation
- **content-research-writer** - Research-backed content creation
- **developer-growth-analysis** - Personal coding growth reports
- **meeting-insights-analyzer** - Communication pattern analysis
- **domain-name-brainstormer** - Creative naming and availability

### 🎨 Creative & Content Tools

- **frontend-design** - Production-grade web interfaces
- **canvas-design** - Visual design and poster creation
- **slack-gif-creator** - Custom animations for Slack
- **twitter-algorithm-optimizer** - Reach and engagement optimization
- **youtube-downloader** - Video and audio acquisition
- **algorithmic-art** - Create generative art with code
- **brand-guidelines** - Apply professional brand styling
- **theme-factory** - Universal styling for artifacts

### ⚙️ Utilities

- **cavecrew** - Subagent delegation and context compression
- **caveman** suite - Ultra-compressed agent communication modes
- **changelog-generator** - Automated release notes from git
- **image-enhancer** - Resolution and clarity improvement
- **raffle-winner-picker** - Fair random selection
- **skill-share** - Team skill discovery via Slack
- **doc-coauthoring** - Structured documentation workflow

## Philosophy

- **Test-Driven Development** - Write tests first, always
- **Systematic over ad-hoc** - Process over guessing
- **Complexity reduction** - Simplicity as primary goal
- **Evidence over claims** - Verify before declaring success

## Contributing

1. Fork the repository
2. Switch to the 'dev' branch
3. Create a branch for your work
4. Follow the `writing-skills` skill for creating and testing new and modified skills
5. Submit a PR.

## License

MIT License - see LICENSE file for details

## Community

Mega-Skills is maintained by [Gaurav](https://github.com/artgaurav16420-oss), based on the methodology by Jesse Vincent and the Prime Radiant team, augmented with libraries from Anthropic and Composio.

- **Discord**: [Join us](https://discord.gg/35wsABTejz) for community support.
- **Issues**: <https://github.com/artgaurav16420-oss/Mega-Skills/issues>
