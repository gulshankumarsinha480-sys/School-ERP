# TODO - Make UI Responsive

- [ ] Inspect global styles (src/styles/theme.css) and Tailwind setup (if needed).
- [x] Update all main app layout components to ensure top bar and content never overflow on small screens.
  - [x] src/app/components/Layout.tsx
  - [x] src/app/components/StudentLayout.tsx
  - [x] src/app/components/InventoryLayout.tsx
  - [x] src/app/components/LibrarianLayout.tsx

- [x] Add responsive wrapping/spacing fixes for common flex rows:
  - [x] Top bar right-side controls (ThemeSwitcher + year/labels)
  - [ ] Any dropdown trigger/menus that might clip
- [ ] Audit pages/components for any hard desktop-only spacing and replace with responsive equivalents.
- [ ] Run build/lint (npm/pnpm) and fix any TypeScript/formatting errors.
- [ ] Quick manual check instructions (mobile/tablet widths).

