# Repository Audit

## Overview
- **Repository**: star-player-awards
- **Scope**: Static single-page voting app (`index.html`), offline assets, and service worker. No build tooling.
- **Audit Date**: 2025-10-13

## High-Risk Findings
1. **Hard-coded admin password in client bundle** – The password `zsbf12` is embedded directly in the HTML and JavaScript, allowing anyone with source access to unlock the admin view and manipulate attendance, votes, or session data. 【F:index.html†L389-L393】【F:index.html†L874-L879】
2. **Unauthenticated Firebase realtime database usage** – The client initializes Firebase with full realtime database access using public credentials but enforces no authentication. Any user who inspects the bundle can reuse the configuration to read or write arbitrary session data, including attendance, votes, and reveal triggers. 【F:index.html†L419-L520】
3. **Personally identifiable attendance data stored in localStorage without safeguards** – Names, attendance status, and voting history are persisted to localStorage/sessionStorage without consent prompts or clear retention limits. Devices shared among users can leak previous sessions or expose staff identities. 【F:index.html†L434-L481】

## Medium-Risk Findings
1. **Inaccurate or stale repository documentation** – The README and CLAUDE guidance do not reflect the Firebase-backed architecture or security considerations, increasing onboarding risk and likelihood of misconfiguration. 【F:README.md†L1-L1】【F:CLAUDE.md†L1-L34】
2. **Service worker cache strategy risks stale critical data** – The cache-first strategy for all non-navigation requests can serve outdated JavaScript/HTML fragments (including Firebase config and password) after updates. Without a cache busting strategy, users may remain on old builds indefinitely. 【F:service-worker.js†L1-L19】
3. **Session selection allows unvalidated identifiers** – Admins can switch `sessionId` to arbitrary strings which are then used as Firebase paths without validation, risking accidental collisions or path issues when unsupported characters are entered. 【F:index.html†L486-L520】【F:index.html†L906-L935】

## Low-Risk / Observational Findings
1. **Accessibility gaps in modal implementation** – Modals toggle visibility but do not trap focus, update `aria-hidden`, or restore focus, making keyboard and assistive technology navigation difficult. 【F:index.html†L372-L412】【F:index.html†L851-L888】
2. **Performance optimization opportunities** – All styles and scripts live inline in `index.html`, preventing browser caching across navigations and blocking early render. Moving assets to separate files or adopting build tooling would improve repeat load times. 【F:index.html†L1-L940】
3. **Limited PWA metadata** – The manifest declares only a 192×192 icon and lacks maskable icons or screenshots, reducing install quality on Android and desktop. 【F:manifest.json†L1-L11】

## Recommendations
- Replace the hard-coded admin password with a secure authentication flow (e.g., Firebase Auth, Identity Platform, or at minimum environment-specific secrets loaded server-side). Revoke the exposed credentials.
- Configure Firebase realtime database security rules to enforce per-session read/write permissions and require authenticated identities for admin operations.
- Implement data minimization: avoid persisting identifiable attendance data to localStorage, or encrypt data and provide clear retention controls.
- Update project documentation to describe the current architecture, deployment, and security expectations. Remove or revise stale CLAUDE guidance.
- Adjust the service worker to use cache busting (revisioned asset URLs) or a stale-while-revalidate strategy, and provide a manual update path.
- Validate and sanitize session identifiers before using them as database paths; surface helpful error messages for invalid characters.
- Improve accessibility by adding focus management, role/aria attributes, and keyboard handling for modals.
- Consider modularizing CSS/JS and introducing basic build tooling to enable caching and linting.
- Expand the web manifest with additional icon sizes (including maskable variants) and optional shortcuts/screenshots for better install UX.
