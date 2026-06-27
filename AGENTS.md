<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Think - Development Rules

These rules are mandatory. Every implementation must follow them.

## 1. UI Preservation
- Never redesign the interface.
- Never improve the visual design unless explicitly instructed.
- Never replace layouts or move components.
- The Google Stitch design is the source of truth.

## 2. Pixel Accuracy
- Preserve spacing, padding, margins, corner radius, typography hierarchy, visual hierarchy, and responsive behavior.
- Follow the exported HTML structure. Do not estimate.

## 3. Component Reuse
- Create shared components for: Buttons, Cards, Navigation, Inputs, Typography, Dialogs, Badges, Progress, Calendar, Quote Card, Thinking Card.
- Never duplicate components.

## 4. Next.js Architecture
- Always use App Router, TypeScript, and Tailwind CSS.
- Server Components by default; Client Components only when required.

## 5. Folder Structure
- Maintain folders: `app/`, `components/`, `hooks/`, `services/`, `types/`, `constants/`, `lib/`, `utils/`, `assets/`, `public/`.
- Never place everything inside one folder.

## 6. Clean Code
- Small functions and components.
- Readable names, meaningful variables and props. No duplicated logic.

## 7. State Management
- Prefer React Hooks. Use Context only when necessary. Avoid global state.

## 8. Styling
- Tailwind CSS only. No inline styles. No duplicated classes.

## 9. Icons
- Use Lucide React. Outline style only. Never use emojis, animated emojis, or stickers.

## 10. Animations
- Keep animations fast, smooth, purposeful, and subtle.

## 11. Performance
- Lazy load when possible. Memoize expensive components. Optimize images.

## 12. Accessibility
- Semantic HTML, keyboard support, ARIA, large touch targets, accessible contrast.

## 13. Mobile First
- Mobile experience has priority. Desktop adapts from mobile.

## 14. Design Language
- Premium, Warm, Minimal, Friendly, Human Crafted, Lifestyle, Calm, Modern. Never corporate/dashboard-heavy/AI-looking.

## 15. Thinking Experience
- Support independent thinking, not exam-taking or AI chatting.

