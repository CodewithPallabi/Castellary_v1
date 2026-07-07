<div align="center">

# 🏰 Castellary

### *Transforming student group projects into cooperative RPG adventures.*

<p><img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,python,fastapi,postgres,supabase,vercel,git,github,vscode" /></p>

**Frontend MVP • v0.1.0 • Built for NYC CodeQuest 2026 (EDU-04)**

</div>

---

> [!NOTE]
> This repository currently contains the **Frontend MVP**. Backend services, AI quest generation, authentication, and real-time collaboration are planned.

## 📖 Table of Contents
- 🎯 Overviews
- ❗ The Problem
- ⚔️ Why Castellary?
- 🧠 How It Works
- ✨ Features
- 🌍 Civilization System
- 📊 Comparison
- 🛠️ Technology Stack
- 📂 Project Structure
- 🗺️ Roadmap
- 💡 Development Philosophy
- 📚 Documentation

---

# Overview

Castellary is a gamified productivity platform that transforms traditional task management into an immersive adventure. Instead of interacting with plain boards and checklists, users progress through richly designed worlds where every task contributes to building kingdoms, conquering empires, surviving futuristic cities, or mastering legendary clans.

The application combines modern productivity principles with storytelling, dynamic visuals, interactive animations, and reward-driven progression to make planning, studying, and project management significantly more engaging. Built with scalability in mind, Castellary features a modular architecture that allows entirely new themes, mechanics, and gameplay-inspired experiences to be introduced without affecting the core system.

---

# The Problem

Student group projects often fail because:

- work is divided informally
- ownership is unclear
- contribution becomes uneven
- planning starts too late
- existing project management tools feel overwhelming or boring

Professional teams solve these issues using Agile, Scrum, Kanban, and structured accountability.

Students rarely have access to workflows designed for them.

---

# Why Castellary?

Let's be honest—most productivity apps work, but they all start to feel the same. You create tasks, check a few boxes, close the app, and repeat the process the next day. Over time, that routine becomes dull, making it easier to lose motivation and postpone important work.

Castellary changes that by giving every task a purpose beyond simply checking a box. Completing work means growing your world, unlocking progress, and seeing your efforts reflected through interactive environments, rewarding animations, and meaningful visual feedback.

Rather than forcing motivation through reminders alone, Castellary makes progress something you can actually see and enjoy. Combined with customizable themes, AI-powered assistance, and an engaging interface, it helps transform productivity from a repetitive habit into an experience you'll want to come back to every day.

| Traditional Workflow | Castellary |
|----------------------|------------|
| Project | Boss Battle |
| Sprint | Raid |
| Task | Quest |
| Team | Guild |
| Progress Bar | Boss HP |
| Standup | Campfire |
| Kanban | War Table |

---

# How It Works

```text
  Assignment
      │
      ▼
 AI analyzes requirements (Planned)
      │
      ▼
 Project broken into quests
      │
      ▼
 Every quest has one owner
      │
      ▼
 Guild collaborates
      │
      ▼
 Boss HP decreases
      │
      ▼
 Project completed
```

---

# Core Features

## Current MVP

- Cinematic landing experience
- Interactive presentation
- Civilization selector
- Theme engine
- Guild dashboard
- Quest board concept
- Boss panel
- Responsive layouts
- Modular architecture
- Mock project environment

## Planned

- AI-powered quest generation
- Authentication
- FastAPI backend
- PostgreSQL
- Real-time collaboration
- XP progression
- Achievements
- Inventory
- Notifications
- Mobile support

---

# Civilization System

Six playable visual themes currently exist:

- 🏰 Medieval Kingdom
- 🏛 Roman Empire
- 🌆 Cyberpunk City
- ⚔ Samurai Clan
- 🤖 Robo Frontier
- ⛏ Blockcraft World

Every civilization includes its own:

- typography
- color palette
- assets
- backgrounds
- characters
- UI styling

while sharing the same gameplay systems.

---

# Built on Proven Principles

Rather than inventing a new productivity methodology, Castellary adapts existing ones.

- Agile
- Scrum
- Kanban
- Work Breakdown Structure
- RACI Accountability Matrix

Behavioral science concepts also influenced the design:

- Ringelmann Effect
- Social Loafing
- Shared Accountability
- Social Interdependence

---

# Comparison

| Feature / Criteria | Habitica | Solo Productivity Apps | Corporate Suites (Jira) | Castellary (Ours) |
| :--- | :---: | :---: | :---: | :---: |
| **Team-First Architecture** | Partial | No | Yes | **🔥 YES** |
| **AI Task Scoping & Decomposition** | No | No | No | **🔥 YES** |
| **1:1 Strict Task Ownership** | No | No | Yes | **🔥 YES** |
| **Shared Team-Wide Consequences** | No | No | No | **🔥 YES** |
| **Built on Agile Frameworks** | No | No | Yes | **🔥 YES** |

---

# Technology Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Context API

## Planned Backend

- FastAPI
- PostgreSQL
- Clerk/Auth.js
- Supabase Storage
- Vercel
- Railway / Render
- Sentry
- PostHog

---

# Current Development Status

**Version**

`v0.1.0`

This repository currently contains the frontend MVP.

Implemented today:

- Product vision
- Presentation flow
- Dashboard concept
- Theme engine
- Civilization system
- Quest management concept

Planned:

- Backend
- AI
- Multiplayer
- Authentication
- Boss mechanics
- Progression systems

---

# Roadmap

| Phase | Status |
|--------|--------|
| Frontend MVP | ✅ Complete |
| Backend & Database | 🚧 Planned |
| Project Management Engine | ⏳ Planned |
| AI Quest Engine | ⏳ Planned |
| Gamification Systems | ⏳ Planned |
| Production Release | ⏳ Planned |

---

# Project Structure

```text
📁 CASTELLARY
│
├── 📁 app
│   ├── 📁 dashboard
│   ├── 📄 layout.tsx
│   ├── 📄 page.tsx
│   └── 🎨 globals.css
│
├── 📁 components
│   ├── 📁 landing
│   ├── 📁 dashboard
│   └── 📁 ui
│
├── 📁 context
│   ├── 📄 BoardDragContext.tsx
│   ├── 📄 HeroSessionContext.tsx
│   ├── 📄 KingdomCampaignContext.tsx
│   └── 📄 RealmThemeContext.tsx
│
├── 📁 hooks
│   ├── 🪝 useAudioController.ts
│   ├── 🪝 useCursorParallax.ts
│   └── 🪝 useThemeConfig.ts
│
├── 📁 lib
│   ├── 📁 constants
│   ├── 📁 helpers
│   ├── 📁 utils
│   ├── 📁 mock
│   ├── 📁 motion
│   ├── 📁 asset
│   └── 📄 fonts.ts
│
├── 📁 services
│   ├── 📁 audio
│   ├── 📁 gemini
│   ├── 📁 notifications
│   ├── 📁 supabase
│   └── 📄 flags.ts
│
├── 📁 public
│   ├── 📁 logo
│   ├── 📁 themes
│   │   ├── 🏰 medieval
│   │   ├── 🏛️ roman
│   │   ├── 🌃 cyberpunk
│   │   ├── ⚔️ samurai
│   │   ├── 🤖 robo
│   │   └── ⛏️ blockcraft
│   └── 📁 audio
│
├── 📁 types
│   └── 📄 index.ts
│
├── 📁 docs
│   ├── 📘 PROJECT_ARCHITECTURE.md
│   ├── 📘 PROJECT_TECH_STACK.md
│   ├── 📘 CODEBASE_WALKTHROUGH.md
│   ├── 📘 THEME_SYSTEM.md
│   ├── 📘 ASSET_REFERENCE.md
│   └── 📘 CODEBASE_AUDIT_REPORT.md
│
├── ⚙️ .gitignore
├── 📘 README.md
├── 📦 package.json
├── 🔒 package-lock.json
├── ⚙️ tsconfig.json
├── 🎨 tailwind.config.ts
├── ▲ next.config.ts
├── 🧹 eslint.config.mjs
└── 🎨 postcss.config.mjs
```
---

# Development Philosophy

Castellary was designed around a simple belief:

> Students shouldn't need to master enterprise software before they can collaborate effectively.

By combining structured project management with familiar game mechanics, Castellary encourages ownership, visibility, and teamwork without exposing users to unnecessary complexity.

---

# Documentation

Additional documentation lives inside `/docs`.

- Project Architecture
- Theme System
- Tech Stack
- Asset Reference
- Codebase Walkthrough
- Audit Report

---

</br>

## 👥 The Castellary Syndicate

We have organized our team into focused tracks, separating interface design, intelligent backend, Creative Social Media handler and Lead researcher to ensure rapid and parallel development.

<br />

<table width="100%">
  <tr>
    <td width="25%" align="center" valign="top">
      <img src="https://media.discordapp.net/attachments/1511745529204310108/1523026450280611861/43eed9fe-e40b-41cf-a036-99d3b046593d.jpg?ex=6a4de82a&is=6a4c96aa&hm=f14225cbc24093dc6d53f600f2ac000c86fc6a9ca6b29ea1094381eeb2b5b550&=&format=webp&width=577&height=577" width="100" style="border-radius: 50%;" alt="Lead Matrix"/><br />
      <strong>👑 Lead Developer</strong><br />
      <sub>Tech Lead / Architect</sub>
      <br /><br />
      <a href="https://github.com/CodewithPallabi">🛠️ GitHub</a> • <a href="https://www.linkedin.com/in/pallabi-panja-a24312364/">💼 LinkedIn</a>
      <hr size="1" noshade>
      <small>Transformed the visual design into an interactive reality; engineered the responsive UI layouts, handled complex client-side state machines, and successfully integrated the AI API to drive intelligent task automation loops.</small>
    </td>
    <td width="25%" align="center" valign="top">
      <img src="https://media.licdn.com/dms/image/v2/D4E03AQEFaRmgnxpjHQ/profile-displayphoto-crop_800_800/B4EZ8otOH1J0AI-/0/1783094372078?e=1784764800&v=beta&t=9X5U1uT1tj3TxDlrQv2iHpJJHDmfxAxu8TJpYab6z5k" width="100" style="border-radius: 50%;" alt="DevOps Mage"/><br />
      <strong>🧙 Socials Expert</strong><br />
      <sub>Socials & Presentation Handler</sub>
      <br /><br />
      <a href="https://github.com/DhwanitJoshi21">🛠️ GitHub</a> • <a href="https://www.linkedin.com/in/dhwanit-joshi-49211641a/">💼 LinkedIn</a>
      <hr size="1" noshade>
      <small>Orchestrates the public-facing narrative; translates complex gamified mechanics and backend architecture into high-converting pitch assets, handles multi-channel social deployment, and owns the final presentation delivery to the judging panel.</small>
    </td>
    <td width="25%" align="center" valign="top">
      <img src="https://ugc.production.linktr.ee/677d7708-1821-464b-9e0a-993fa69cfbb8_IMG-20260425-114833-285.webp?io=true&size=avatar-v3_0" width="100" style="border-radius: 50%;" alt="UI Knight"/><br />
      <strong>⚔️ Backend Expert</strong><br />
      <sub>Backend system developer</sub>
      <br /><br />
      <a href="https://github.com/buildwith-krishna">🛠️ GitHub</a> • <a href="https://www.linkedin.com/in/krishna-pandey-aa53543b3/">💼 LinkedIn</a>
      <hr size="1" noshade>
      <small>The server-side logic layer, database relations, and secure authentication workflows. Translated the gamified core concept into stable, low-latency API routes, deterministic task state trackers, and live webhook integrations.</small>
    </td>
    <td width="25%" align="center" valign="top">
      <img src="https://media.licdn.com/dms/image/v2/D4D03AQHLjfz5Bu5Miw/profile-displayphoto-scale_100_100/B4DZ8rX11HIYAY-/0/1783139098943?e=1784764800&v=beta&t=XA3Pmst1zVcU5wA9hGo17hDR1LXv0RhciqCctEETabs" width="100" style="border-radius: 50%;" alt="Security Knight"/><br />
      <strong>🛡️The Gamification Architect </strong><br />
      <sub>Creative Concept Writer </sub>
      <br /><br />
      <a href="https://github.com/Luorze">🛠️ GitHub</a> • <a href="https://www.linkedin.com/in/soham-singh-kushwah-0536b1382/">💼 LinkedIn</a>
      <hr size="1" noshade>
      <small>Pioneered the core product concept; architected the behavioral mechanics mapping enterprise Agile workflows to immersive RPG progression systems, party-concurrency loops, and deadline-driven boss raid encounters.</small>
    </td>
  </tr>
</table>

---

</br>


## ⚖️ Intellectual Property & Attribution License

This blueprint repository and its entire contents are explicitly developed and maintained by **Team CodeAhead** for the **Codequest Hackathon 2026** arena.

### Ownership Scope
All structural specifications, interactive flow diagrams, system architecture topographies, database schemas, and product design methodologies contained within this repository remain the exclusive intellectual property of **Team CodeAhead**, except where third-party open-source libraries or foundational APIs are explicitly cited.

* **Usage Directive:** Unauthorized duplication, restructuring, or out-of-competition replication of these unique design frameworks without explicit consensus or attribution to Team CodeAhead is strictly prohibited.

---

<div align="center">
  
*Propelled by execution discipline • Team CodeAhead © 2026*

</div>
