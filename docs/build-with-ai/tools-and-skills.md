---
title: AI Tools & Skills
description: Laravel Boost guidelines and Agent Skills for PowerGrid themes, v6 theme upgrades, and plugins.
---

# AI Tools & Skills

[[toc]]

PowerGrid ships a Boost guideline and three Agent Skills so coding agents follow v7 theming and plugin conventions.

## Supported AI Tools

Skills work with [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Cursor](https://cursor.com), [GitHub Copilot](https://github.com/features/copilot), and other agents that load Agent Skills.

## PowerGrid Skills

[Agent Skills](https://agentskills.io/home) load only when the task matches. They live in the package at `resources/boost/skills/`.

### Available Skills

| Skill                     | Purpose                                                                          |
| ------------------------- | -------------------------------------------------------------------------------- |
| `powergrid-theme`         | Create or update themes with section methods, `theme_overrides`, or `ArrayTheme` |
| `upgrade-theme-v6-to-v7`  | Migrate a v6 Theme class to v7 section methods                                   |
| `create-powergrid-plugin` | Scaffold a plugin with PHP class, Blade view, Alpine.js, and registration        |

### Skill Triggers

#### PowerGrid Theme

```text
Create a new PrimeReact theme for PowerGrid.

Add dark mode support to my Tailwind theme.

I need a custom Vuetify theme for PowerGrid.
```

#### Upgrade v6 Theme

```text
Migrate my Bootstrap theme from v6 to v7.

Upgrade my Tailwind theme to the new struct() format.

Convert this v6 PowerGrid theme to v7.
```

#### Create PowerGrid Plugin

```text
Create a selectable plugin for Column::add()->selectable([...])

Build a rating stars plugin for PowerGrid, the column "rate" has a number of 1-5.

Create a color picker plugin that saves on change
```

## Laravel Boost

[Laravel Boost](https://github.com/laravel/boost) is an MCP server that connects agents to your Laravel app.

Install Boost, then install PowerGrid's guideline and skills into the selected agents:

```bash
composer require laravel/boost --dev
php artisan boost:install
```

Already using Boost? After installing or upgrading PowerGrid:

```bash
php artisan boost:update --discover
```

That scans installed packages and publishes PowerGrid's AI resources.

### Integration Overview

| Component      | Location in the package                         | Loaded                  | Content                                                                    |
| -------------- | ----------------------------------------------- | ----------------------- | -------------------------------------------------------------------------- |
| **Guidelines** | `resources/boost/guidelines/core.blade.php`     | Upfront, always present | Core architecture, theming system, performance hot zones, testing patterns |
| **Skills**     | `resources/boost/skills/*/SKILL.md`             | On-demand               | Workflows for themes, v6 migration, and plugins                            |

Guidelines cover: component structure, theming, available themes, filters and actions, partials, per-component overrides, views, testing, and a plugin overview.

## Using Skills without Laravel Boost

Copy or point your agent at:

`vendor/power-components/livewire-powergrid/resources/boost/skills/`

Example:

```text
Use the skills defined in vendor/power-components/livewire-powergrid/resources/boost/skills/powergrid-theme/SKILL.md
to design a Tailwind CSS v4 theme for a food ordering application.
```
