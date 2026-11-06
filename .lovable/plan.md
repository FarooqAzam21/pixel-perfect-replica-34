# Premium Global Logistics Website

## Goal
Replace the starter screen with a polished, responsive global shipping and freight website, following the uploaded brief while avoiding invented company facts and live shipment claims.

## Experience
- Build the homepage as an editorial, cinematic logistics experience with a strong port image, refined navy/white/blue identity, accessible navigation, mobile menu, and responsive layouts.
- Include clear sections for services, illustrative global network/routes, the shipment journey, industries, company approach, insights, contact, and footer.
- Add shipment lookup with input validation and a clearly labeled demonstration result; never imply that a real carrier system is connected.
- Add a multi-step quote form with shipment/contact details, review/edit, validation, and an honest integration-ready completion state; do not claim a request was transmitted.
- Mark company-specific offerings, coverage, history, contact information, and credentials as pending confirmation; do not fabricate them.
- Provide distinct About, Services, Global Network, Tracking, Quote, and Contact pages with working navigation and metadata, while keeping the homepage at `/`.

## Technical approach
- Preserve the existing TanStack Start, React, and Tailwind v4 setup; build on the current homepage and add file-based pages.
- Define the requested palette and typography as semantic design tokens. Use generated logistics imagery stored as project assets, with restrained motion and reduced-motion support.
- Keep tracking and quote flows frontend-only until a real tracking service and submission endpoint are provided; make demo/sample states explicit.
- Add focused tests for tracking demo versus unknown identifiers and quote validation, then verify navigation, key interactions, responsive rendering, and the preview build.
