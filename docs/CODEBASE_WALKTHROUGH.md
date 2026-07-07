# Castellary MVP — Codebase Walkthrough

This walkthrough details the purpose, structure, props, and dependencies of every key file in the Castellary codebase.

---

## 📁 `app/` (Next.js Application Root)

### 1. [app/layout.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/app/layout.tsx)
* **Purpose:** Sets the HTML root structure, metadata parameters, and wraps the application inside the global context state providers.
* **Contexts Loaded:**
  - `RealmThemeProvider`
  - `HeroSessionProvider`

### 2. [app/page.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/app/page.tsx)
* **Purpose:** Implements the presentation slide deck landing experience. It listens to user scroll wheel inputs and arrow keys to transition slides using GPU translate transforms. Optimized with lazy loading on below-the-fold slides.

### 3. [app/dashboard/page.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/app/dashboard/page.tsx)
* **Purpose:** Serves as the main board entrypoint. Integrates sidebar navigation, top bar levels, quest boards, and active campaign logs.

---

## 📁 `components/landing/` (Landing Deck Components)

### 4. [components/landing/Scene01Awakening.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/components/landing/Scene01Awakening.tsx)
* **Purpose:** Slide 1 Intro. Sets the ruined castle environment and the main title using the elegant Cinzel font.

### 5. [components/landing/Scene02Challenge.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/components/landing/Scene02Challenge.tsx)
* **Purpose:** Slide 2 Vision. Formatted as an ancient royal manuscript page enclosed inside a gold shield border ornament with a blurred backdrop.

### 6. [components/landing/Scene03BattleBegins.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/components/landing/Scene03BattleBegins.tsx)
* **Purpose:** Slide 3 Boss Introduction. Shows the devil boss character artwork with solid gold titles and quest directives.

### 7. [components/landing/SceneShowcase.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/components/landing/SceneShowcase.tsx)
* **Purpose:** Wrapper for slides 4–9. Serves the individual civilization showcase slides (Medieval, Roman, Cyberpunk, Samurai, Robo, Blockcraft).

### 8. [components/landing/Scene10GuildCharter.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/components/landing/Scene10GuildCharter.tsx)
* **Purpose:** Slide 10 Steps. Renders the five instructions inside gold shield frames.

### 9. [components/landing/Scene11KeepPortal.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/components/landing/Scene11KeepPortal.tsx)
* **Purpose:** Slide 11 Gate. Formulates the user registration and authorization wizard. Renders vector social links in the footer.

---

## 📁 `components/dashboard/` (Workspace Dashboard Components)

### 10. [components/dashboard/QuestBoard.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/components/dashboard/QuestBoard.tsx)
* **Purpose:** Integrates drag-and-drop contexts to let users move quest cards across columns, triggering gold confetti on completion.

### 11. [components/dashboard/BossPanel.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/components/dashboard/BossPanel.tsx)
* **Purpose:** Renders the active raid boss combat health widget. Completing tasks deals strike damage to the boss's HP bar.

### 12. [components/dashboard/KeepSidebar.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/components/dashboard/KeepSidebar.tsx)
* **Purpose:** Controls navigation menu selections and campaign realm selectors.

### 13. [components/dashboard/KeepTopbar.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/components/dashboard/KeepTopbar.tsx)
* **Purpose:** Displays the hero's username, active class, and campaign XP level badge.
