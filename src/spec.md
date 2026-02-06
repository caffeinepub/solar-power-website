# Specification

## Summary
**Goal:** Restore reliable Internet Identity (II) login in production by fixing missing frontend configuration and improving Admin login error feedback.

**Planned changes:**
- Add/repair a shared `frontend/src/config.ts` module so imports used by `useInternetIdentity.ts` and `useActor.ts` resolve correctly at build/runtime.
- Ensure the config provides safe defaults for Internet Identity (so the login `identityProvider` URL is not undefined/invalid at runtime) and exposes:
  - `loadConfig()` returning at least `{ ii_derivation_origin: string }`
  - `createActorWithConfig(...)` for actor creation used by `useActor`
- Update the Admin login UI to display a user-visible English error message when II login fails (using `loginError` or a safe fallback) and provide a Retry action that calls `login()` again.
- Do not modify immutable hook files (`frontend/src/hooks/useInternetIdentity.ts` and `frontend/src/hooks/useActor.ts`).

**User-visible outcome:** Admin users can click Login to open the Internet Identity flow without config-related errors, successfully authenticate to reach an authenticated Admin page, and see a clear error + Retry option if login fails.
