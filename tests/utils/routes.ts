/**
 * Known routes for the RankersPro static export.
 *
 * The Global Navigation test (site-flows.spec.ts) does NOT hardcode this
 * list to decide pass/fail — it discovers whatever links actually render
 * in the <nav>/<footer> and checks each one. This list exists only for
 * tests that need to target a specific, deliberately-picked page (e.g.
 * the resources article) and as living documentation of build status.
 *
 * Keep this in sync with claude/rankerspro-nextjs-build-notes.md when the
 * site's route list changes.
 */
export const BUILT_ROUTES = [
  "/",
  "/about",
  "/faculty",
  "/achievers",
  "/batches",
  "/mentorship",
  "/resources",
  "/resources/how-rp-sir-cracked-gate-air-179",
] as const;

/**
 * Nav links that exist in the menu but have NO page behind them yet
 * (confirmed in build notes as Day-2 / not-yet-built). The nav-links test
 * still visits every link it finds — including these — because catching
 * "nav points somewhere that 404s" *is* the point of that test. This list
 * is just so a failure here reads as "known gap, not a regression" in the
 * console output rather than a mystery.
 *
 * /about and /achievers shipped and were removed from this list —
 * see BUILT_ROUTES above.
 */
export const KNOWN_PENDING_ROUTES = ["/contact"] as const;
