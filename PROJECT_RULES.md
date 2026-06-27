# Project Think - Development Rules

These rules are mandatory.

Every implementation must follow them.

Breaking these rules is considered incorrect implementation.

---

# 1. UI Preservation

Never redesign the interface.

Never improve the visual design unless explicitly instructed.

Never replace layouts.

Never move components.

The Google Stitch design is the source of truth.

---

# 2. Pixel Accuracy

Preserve

Spacing

Padding

Margins

Corner Radius

Typography hierarchy

Visual hierarchy

Responsive behavior

Do not estimate.

Follow the exported HTML structure.

---

# 3. Component Reuse

Always reuse components.

Never duplicate components.

Create shared components for

Buttons

Cards

Navigation

Inputs

Typography

Dialogs

Badges

Progress

Calendar

Quote Card

Thinking Card

---

# 4. Next.js Architecture

Always use

App Router

TypeScript

Tailwind CSS

Server Components by default

Client Components only when required.

---

# 5. Folder Structure

app/

components/

hooks/

services/

types/

constants/

lib/

utils/

assets/

public/

Never place everything inside one folder.

---

# 6. Clean Code

Small functions.

Small components.

Readable names.

Meaningful variables.

Meaningful props.

No duplicated logic.

---

# 7. State Management

Prefer

React Hooks

Context only when necessary.

Avoid unnecessary global state.

---

# 8. Styling

Tailwind CSS only.

No inline styles.

No duplicated utility classes.

Extract repeated styles into reusable components.

---

# 9. Icons

Use Lucide React.

Outline style only.

Never use Emoji.

Never use animated Emoji.

Never use stickers.

---

# 10. Animations

Keep animations

Fast

Smooth

Purposeful

Subtle

Never use flashy animations.

---

# 11. Performance

Lazy loading when possible.

Memoize expensive components.

Optimize rendering.

Optimize images.

Avoid unnecessary client rendering.

---

# 12. Accessibility

Semantic HTML.

Keyboard support.

ARIA when needed.

Large touch targets.

Readable text.

Accessible contrast.

---

# 13. Mobile First

The mobile experience has priority.

Desktop adapts from mobile.

Never sacrifice mobile usability.

---

# 14. Product Consistency

All pages must look like one product.

Never introduce a different design language.

---

# 15. Design Language

Premium

Warm

Minimal

Friendly

Human Crafted

Lifestyle

Calm

Modern

Never corporate.

Never dashboard-heavy.

Never AI-looking.

---

# 16. Thinking Experience

Users are thinking.

Not taking an exam.

Not chatting with AI.

Everything should reinforce this experience.

---

# 17. Code Quality

Every generated file must be production-ready.

Never generate placeholder architecture.

Never generate temporary solutions.

Think long-term.

---

# Final Rule

Whenever uncertainty exists,

Preserve the original design,

Preserve maintainability,

Preserve scalability,

Preserve user experience.
