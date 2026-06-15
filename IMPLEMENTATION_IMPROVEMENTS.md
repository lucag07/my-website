# Frontend Implementation Plan & Progress Tracker

This document outlines the proposed frontend improvements to polish, optimize, and enhance the website's user experience (UX), accessibility (a11y), performance, and search engine visibility (SEO). Use the checklists below to track progress.

---

## 1. Advanced Form Validation & UX Enhancements
Improve the validation, feedback loop, and experience of interactive forms/modals across the website.

- [x] **Form Validation in `ExitIntentModal.tsx`**
  - Integrate `react-hook-form` and `zod` to validate input fields (e.g., matching the schema pattern used in `AuditFormSection.tsx`).
  - Add inline error messages and visual states for invalid inputs.
- [ ] **Explicit Submission Feedback**
  - Show a clear, accessible loading state on submit buttons (`AuditFormSection`, `ExitIntentModal`) to prevent double submissions.
  - Implement a toast notification system (e.g. using a light custom utility or micro-component) for successful submissions and error handling.
- [ ] **Interactive Financial Calculator**
  - Turn the static math in `FinancialMathSection.tsx` into a lightweight, dynamic interactive widget. Let clients input their own average trade value and see calculated returns in real time.

---

## 2. Accessibility & Usability (a11y)
Ensure the application is fully usable for all visitors, meeting WCAG 2.1 AA guidelines.

- [x] **Focus Trapping & Keyboard Control for `ExitIntentModal.tsx`**
  - Implement focus trapping using a React ref or custom hook when the exit-intent modal is open.
  - Enable pressing the `Esc` key to close the modal.
  - Return focus to the trigger element (or header/body if triggered by exit intent) upon closing.
- [ ] **ARIA Roles & Text Alternatives**
  - Add descriptive `aria-label` tags to links and buttons that do not contain visible descriptive text.
  - Ensure decorative SVGs in all sections have `aria-hidden="true"`.
- [ ] **Sticky Header Contrast & Layout Shift**
  - Optimize the layout of `StickyHeader.tsx` to prevent content jump (Layout Shift) when it transitions to a fixed state.
  - Check text-to-background contrast ratios for the header links.

---

## 3. Performance & Asset Optimization
Improve page load times and core web vitals.

- [ ] **Image Optimization**
  - Ensure the `/logo.png` is properly optimized (correct sizing, compressed) or converted to SVG where possible.
  - Define explicit width and height attributes on the logo and other image elements to prevent Layout Shift.
- [ ] **Code Splitting & Lazy Loading**
  - Lazy load components/sections that are below the fold (e.g. `FAQSection`, `FinancialMathSection`) using React `lazy` and `Suspense`.
- [ ] **Optimization of Scroll Reveal Hooks**
  - Use `IntersectionObserver` configurations in `useScrollReveal` to ensure smooth transitions without taxing the main thread.

---

## 4. Search Engine Optimization (SEO) & Metadata
Refine organic search presence and social sharing formatting.

- [x] **Dynamic Title & Meta Tag Management**
  - Configure page head elements dynamically, ensuring correct Open Graph and Twitter Card tags.
- [x] **Local Business Schema Integration**
  - Review and expand JSON-LD structured data (schema.gdoc) for correct mapping of business name, contact info, ratings, and service area.
- [x] **Semantic Markup Check**
  - Verify that only one `<h1>` exists on the page (within the Hero Section) and that heading levels (`<h2>`, `<h3>`) follow a logical structure.
