# Castellary MVP — Project Tech Stack

This document outlines the core technology stack and dependencies chosen for **Castellary**, detailing their purposes, locations, benefits, and key files.

---

## 🚀 Core Stack

### 1. Next.js (v15.1.0)
* **What it is:** A React framework for building fast, search-engine-optimized, production-ready web applications.
* **Why we use it:** Provides React Server Components (RSC) for initial page delivery, modular App Router routing, and static generation optimizations.
* **Where it is used:** Core application framework across the entire codebase.
* **Important files:**
  - [next.config.ts](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/next.config.ts) (Config options)
  - [app/layout.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/app/layout.tsx) (Global HTML structure)
  - [app/page.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/app/page.tsx) (Landing gateway)
  - [app/dashboard/page.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/app/dashboard/page.tsx) (Main board)

### 2. React (v19.0.0) & React DOM
* **What it is:** A component-based user interface library.
* **Why we use it:** Next-generation declarative rendering, hooks (`useState`, `useEffect`, `useContext`), and fiber DOM reconciliations.
* **Where it is used:** Base library for all UI views.

### 3. TypeScript (v5.x)
* **What it is:** A typed superset of JavaScript.
* **Why we use it:** Static type safety, autocomplete, developer ergonomics, and preventing runtime interface bugs.
* **Where it is used:** Applied globally to all `.ts` and `.tsx` source files.
* **Important files:**
  - [tsconfig.json](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/tsconfig.json) (Compiler rules)
  - [types/index.ts](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/types/index.ts) (Global type definitions)

---

## 🎨 Styles & Layout

### 4. Tailwind CSS (v3.4.1)
* **What it is:** A utility-first CSS framework.
* **Why we use it:** Accelerated styling loops, responsive breakpoints, class purging, and seamless integration with CSS variables.
* **Where it is used:** Styled inline across components and global stylesheets.
* **Important files:**
  - [tailwind.config.ts](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/tailwind.config.ts) (Dynamic token definitions)
  - [app/globals.css](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/app/globals.css) (Directives and standard rules)

### 5. PostCSS (v8.x) & Autoprefixer
* **What it is:** CSS post-processing pipeline.
* **Why we use it:** Automatic cross-browser vendor prefixing and bundling optimizations.
* **Important files:**
  - [postcss.config.mjs](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/postcss.config.mjs)

---

## 🎭 Animations & Interactions

### 6. Framer Motion (v12.4.2)
* **What it is:** An animation library for React.
* **Why we use it:** Hardware-accelerated slide transitions, micro-interactions, layout morphing, and entrance overlays.
* **Where it is used:** Applied on landing slides, profile cards, and transition sweep filters.
* **Important files:**
  - [lib/motion/micro.ts](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/lib/motion/micro.ts) (Reusable animation profiles)

### 7. @dnd-kit/core & @dnd-kit/sortable
* **What it is:** A modern, lightweight drag-and-drop toolkit.
* **Why we use it:** Enables dragging tasks across Todo, In Progress, and Done columns with accessibility support.
* **Where it is used:** Dashboard task columns.
* **Important files:**
  - [context/BoardDragContext.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/context/BoardDragContext.tsx) (Drag and Drop provider)

---

## 🛠️ Helper Utilities

### 8. Lucide Icons
* **What it is:** Clean, modular vector icon pack.
* **Why we use it:** Provides customizable line icons.
* **Where it is used:** Quest cards, settings panels, header, and sidebar widgets.

### 9. Canvas Confetti
* **What it is:** High-performance canvas particle generator.
* **Why we use it:** Fires gold bursts when completing campaign quests.
* **Where it is used:** Triggered on quest completion in the campaign context.

### 10. clsx & tailwind-merge
* **What it is:** Class merging utility tools.
* **Why we use it:** Safely combines and merges dynamic Tailwind class overrides without duplicates.
