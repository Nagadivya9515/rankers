import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration — RankersPro marketing site (Next.js 14,
 * App Router, `output: "export"`).
 *
 * Run modes (see package.json scripts / README-TESTING.md):
 *   - `npm run test`        -> builds the static export and serves it,
 *                              then runs the full suite against it.
 *   - `npm run test:dev`    -> runs against `next dev` instead (faster
 *                              inner loop; set PW_TEST_MODE=dev).
 *
 * Failures print directly to the terminal via the `list` reporter —
 * no HTML report server needs to be opened to see what broke.
 */
export default defineConfig({
  testDir: "./tests",
  outputDir: "./tests/.artifacts",

  // Fail the build if a `test.only` was accidentally left in (CI safety net).
  forbidOnly: !!process.env.CI,

  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,

  // Global per-test timeout, and a slightly longer window for individual
  // `expect()` polling (useful on first cold-navigation of the static build).
  timeout: 30_000,
  expect: {
    timeout: 8_000,
  },

  // `list` prints a line per test with a full, readable failure trace
  // straight to the console. `html` is added only in CI as a secondary
  // artifact — it never blocks or hides console output.
  reporter: process.env.CI
    ? [["list"], ["html", { open: "never", outputFolder: "tests/.report" }]]
    : [["list"]],

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "Desktop-1280",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: "Mobile-375",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 375, height: 667 },
      },
    },
  ],

  // Auto-spawns the site so `npm run test` "just works" with no manual
  // server step. Toggle with PW_TEST_MODE=dev for `next dev` instead of a
  // full static-export build + preview server.
  webServer: {
    command:
      process.env.PW_TEST_MODE === "dev"
        ? "npm run dev"
        : "npm run build && npx serve@latest out -l 3000 -s",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
