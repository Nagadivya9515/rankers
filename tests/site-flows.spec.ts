import { test, expect, type Page, type Response } from "@playwright/test";
import {
  loadBatches,
  loadAppLinks,
  isAbsoluteHttpUrl,
  PENDING_LINK_TEXT,
  type Batch,
} from "./utils/data";
import { KNOWN_PENDING_ROUTES } from "./utils/routes";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/** Collects every same-origin, navigable <a> href inside a landmark region. */
async function collectInternalLinks(page: Page, landmarkRole: "navigation" | "contentinfo") {
  const region = page.getByRole(landmarkRole).first();
  const hrefs = await region.locator("a[href]").evaluateAll((anchors) =>
    anchors.map((a) => (a as HTMLAnchorElement).getAttribute("href"))
  );

  return Array.from(
    new Set(
      hrefs.filter((href): href is string => {
        if (!href) return false;
        if (href.startsWith("#")) return false; // in-page anchor, not a route
        if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
        if (/^https?:\/\//i.test(href)) return false; // external, checked separately
        return true;
      })
    )
  );
}

/** Navigates and returns both the response and whether the app rendered an error UI. */
async function visitAndDiagnose(page: Page, path: string) {
  const response = await page.goto(path, { waitUntil: "domcontentloaded" });
  const status = response?.status() ?? 0;

  const errorHeading = page.getByRole("heading", {
    name: /404|not found|500|something went wrong|application error/i,
  });
  const showsErrorUi = await errorHeading.isVisible().catch(() => false);

  return { response, status, showsErrorUi };
}

// ---------------------------------------------------------------------------
// 1. Global Navigation & Footer
// ---------------------------------------------------------------------------

test.describe("Global navigation & footer", () => {
  test("sticky navbar renders and stays visible on scroll", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation").first();
    await expect(nav, "Primary <nav> landmark did not render on the homepage").toBeVisible();

    const beforeScroll = await nav.boundingBox();
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(300); // allow sticky transition / scroll listeners to settle
    const afterScroll = await nav.boundingBox();

    expect(
      afterScroll,
      "Nav bounding box disappeared after scrolling — it should stay mounted (sticky/fixed)"
    ).not.toBeNull();
    expect(
      afterScroll!.y,
      `Nav should remain pinned near the top after scrolling 1200px down (was at y=${beforeScroll?.y}, now at y=${afterScroll?.y}) — check the sticky/fixed positioning CSS on the header`
    ).toBeLessThanOrEqual(120);
  });

  test("footer renders with the expected landmark", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo").first();
    await expect(
      footer,
      "No <footer role=contentinfo> landmark found — footer either failed to render or isn't using a semantic <footer> element"
    ).toBeVisible();
  });

  test("every internal nav link resolves without a 404/500", async ({ page }) => {
    await page.goto("/");
    const links = await collectInternalLinks(page, "navigation");

    expect(
      links.length,
      "No internal links were discovered inside the <nav> landmark — selector or markup may have changed"
    ).toBeGreaterThan(0);

    for (const href of links) {
      await test.step(`nav link -> ${href}`, async () => {
        const { status, showsErrorUi } = await visitAndDiagnose(page, href);
        const isKnownPending = (KNOWN_PENDING_ROUTES as readonly string[]).includes(href);
        const context = isKnownPending
          ? " (this route is a KNOWN pending page per build notes — remove it from KNOWN_PENDING_ROUTES once it ships, but it should still not be linked from nav until then)"
          : "";

        expect(
          status,
          `Nav link "${href}" returned HTTP ${status} — expected < 400.${context}`
        ).toBeLessThan(400);
        expect(
          showsErrorUi,
          `Nav link "${href}" rendered a 404/500/error heading in the page body even though the HTTP status was ${status}.${context}`
        ).toBe(false);
      });
    }
  });

  test("every internal footer link resolves without a 404/500", async ({ page }) => {
    await page.goto("/");
    const links = await collectInternalLinks(page, "contentinfo");

    for (const href of links) {
      await test.step(`footer link -> ${href}`, async () => {
        const { status, showsErrorUi } = await visitAndDiagnose(page, href);
        expect(status, `Footer link "${href}" returned HTTP ${status} — expected < 400`).toBeLessThan(400);
        expect(
          showsErrorUi,
          `Footer link "${href}" rendered a 404/500/error heading in the page body`
        ).toBe(false);
      });
    }
  });
});

// ---------------------------------------------------------------------------
// 2. External AppX checkout redirects
// ---------------------------------------------------------------------------

test.describe("AppX checkout CTAs on batch detail pages", () => {
  const batches = loadBatches();
  // Sample: first 5 real batches + every batch with a null price (a known
  // real edge case in the source data — see edge-case suite below too).
  const sample = [
    ...batches.slice(0, 5),
    ...batches.filter((b) => b.price === null),
  ].filter((b, i, arr) => arr.findIndex((x) => x.id === b.id) === i);

  test.skip(batches.length === 0, "data/batches.json not found or empty — skipping AppX CTA checks");

  for (const batch of sample) {
    test(`"${batch.name}" — CTA is a real AppX link, or clearly marked pending (never a silent dead link)`, async ({
      page,
    }) => {
      await page.goto(`/batches/${batch.slug}`);

      const cta = page
        .getByRole("link", { name: /buy now|enroll|appx|get this course/i })
        .first();
      await expect(
        cta,
        `No purchase CTA link found on /batches/${batch.slug} (looked for accessible link text matching /buy now|enroll|appx|get this course/i)`
      ).toBeVisible();

      const href = await cta.getAttribute("href");
      const label = (await cta.textContent())?.trim() ?? "";

      if (batch.appxUrl && batch.appxUrl !== "#") {
        // Real link configured in source data -> must be a genuine absolute URL.
        expect(
          isAbsoluteHttpUrl(href),
          `Batch "${batch.slug}" has a real appxUrl in batches.json (${batch.appxUrl}) but the rendered CTA href is "${href}", which is not an absolute http(s) URL`
        ).toBe(true);
      } else {
        // Placeholder in source data ("appxUrl": "#") — this is a confirmed,
        // documented gap (see rankerspro-nextjs-build-notes.md: "All appxUrl
        // values in batches.json are '#' placeholders"). The bar here is
        // NOT "must be a working link" — it's "must not masquerade as one".
        expect(
          href === "#" || PENDING_LINK_TEXT.test(label),
          `Batch "${batch.slug}" has a placeholder appxUrl ("#") but its CTA renders as a plain, unlabeled link (href="${href}", text="${label}"). ` +
            `A placeholder checkout link must either keep href="#" (harmless) or be visibly labeled as pending (e.g. "Enroll — link pending"), never look like a working purchase button.`
        ).toBe(true);
      }
    });
  }

  test("BUY NOW / Enroll buttons on the batches listing page all have hrefs (no empty href attributes)", async ({
    page,
  }) => {
    await page.goto("/batches");
    const ctaLinks = page.getByRole("link", { name: /buy now|enroll|appx|view details/i });
    const count = await ctaLinks.count();
    expect(count, "No CTA/detail links found on /batches — listing may have failed to render").toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = ctaLinks.nth(i);
      const href = await link.getAttribute("href");
      expect(
        href,
        `CTA link #${i} on /batches has a null/missing href attribute — every rendered card must link somewhere`
      ).toBeTruthy();
      expect(
        href!.trim().length,
        `CTA link #${i} on /batches has an empty-string href`
      ).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------
// 3. App download ecosystem tray
// ---------------------------------------------------------------------------

test.describe("App download ecosystem tray (footer)", () => {
  test("Android, Windows, and Mac download entries are present in the footer", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo").first();
    await expect(footer).toBeVisible();

    const platforms: Array<{ name: string; pattern: RegExp }> = [
      { name: "Android / Play Store", pattern: /android|play store|google play/i },
      { name: "Windows", pattern: /windows/i },
      { name: "Mac / macOS", pattern: /mac(os)?( app store)?/i },
    ];

    for (const platform of platforms) {
      // Match on visible text OR on an accessible name (aria-label/alt),
      // since these are documented as CSS-only device icons, not photographed
      // store badges (see frontend-build-notes.md: "no Apple/Google/Microsoft
      // logos" — generic device-shape icons were used instead).
      const byText = footer.getByText(platform.pattern);
      const byRole = footer.getByRole("link", { name: platform.pattern }).or(
        footer.getByRole("img", { name: platform.pattern })
      );

      const found = (await byText.count()) + (await byRole.count()) > 0;
      expect(
        found,
        `No footer element referencing "${platform.name}" was found (checked visible text and accessible link/img names). ` +
          `The App Ecosystem tray should list Android, Windows, and Mac even while real store links are still pending.`
      ).toBe(true);
    }
  });

  test("app download links are either real absolute URLs or explicitly marked Coming Soon", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo").first();
    const appLinks = footer.getByRole("link", {
      name: /android|play store|windows|mac(os)?|ios|app store/i,
    });
    const count = await appLinks.count();

    if (count === 0) {
      // Some builds render these as non-link elements while "Coming Soon"
      // (see frontend-build-notes.md round 2). That's covered by the
      // presence check above; nothing further to assert here.
      test.skip(true, "App download entries are not rendered as <a> links (likely disabled/Coming Soon state) — nothing to validate as a URL");
    }

    for (let i = 0; i < count; i++) {
      const link = appLinks.nth(i);
      const href = await link.getAttribute("href");
      const label = (await link.textContent())?.trim() ?? "";

      const isRealUrl = isAbsoluteHttpUrl(href);
      const isDeclaredPending = href === "#" || PENDING_LINK_TEXT.test(label);

      expect(
        isRealUrl || isDeclaredPending,
        `App download link "${label}" has href="${href}", which is neither a valid absolute URL nor a clearly-marked pending state. ` +
          `data/apps.json currently ships "#" placeholders per build notes — that's fine as long as it's visibly "Coming Soon", not a dead-looking live link.`
      ).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// 4. Edge-case handling: malformed / missing / placeholder data
// ---------------------------------------------------------------------------

test.describe("Edge-case data handling", () => {
  test("batches with a null price render without literal 'null'/'undefined'/'NaN' in the DOM", async ({
    page,
  }) => {
    const batches = loadBatches();
    const nullPriceBatches = batches.filter((b: Batch) => b.price === null);
    test.skip(
      nullPriceBatches.length === 0,
      "No batches with price=null in the current data set — nothing to exercise for this edge case"
    );

    for (const batch of nullPriceBatches) {
      await test.step(`/batches/${batch.slug} (price: null)`, async () => {
        const response = await page.goto(`/batches/${batch.slug}`);
        expect(response?.status(), `/batches/${batch.slug} failed to load`).toBeLessThan(400);

        const bodyText = await page.locator("body").innerText();
        for (const badToken of ["null", "undefined", "NaN"]) {
          expect(
            bodyText.includes(badToken),
            `/batches/${batch.slug} has price=null in source data but rendered the literal string "${badToken}" — the strikethrough original-price UI should be conditional on price being present, not just discountPrice`
          ).toBe(false);
        }
      });
    }
  });

  test("an unknown batch slug shows a real 404, not a client-side crash", async ({ page }) => {
    const response = await page.goto("/batches/this-slug-does-not-exist-e2e-probe");
    const status = response?.status() ?? 0;

    // A static-export Next.js site legitimately 404s here (no matching
    // generateStaticParams entry) — that is success. A 200 with a blank/
    // broken page, or a 500, is the failure mode this test exists to catch.
    expect(
      status === 404 || status === 200,
      `Unknown batch slug returned unexpected HTTP ${status}`
    ).toBe(true);

    const crashed = await page
      .getByText(/application error|unhandled runtime error/i)
      .isVisible()
      .catch(() => false);
    expect(
      crashed,
      "Visiting a nonexistent batch slug triggered a client-side error boundary instead of a clean 404 page"
    ).toBe(false);
  });

  test("batches listing page does not crash if rendered with zero matching category filter results", async ({
    page,
  }) => {
    await page.goto("/batches?category=__no_such_category__");
    const heading = page.getByRole("heading", { level: 1 }).first();
    await expect(
      heading,
      "/batches with an unrecognized ?category= query param failed to render even a page heading — filtering logic likely throws on an empty result set instead of falling back to 'no results' / all batches"
    ).toBeVisible();

    const crashed = await page
      .getByText(/application error|unhandled runtime error/i)
      .isVisible()
      .catch(() => false);
    expect(crashed, "Unrecognized category filter crashed the batches page").toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 5. Component image placeholders (faculty avatars)
// ---------------------------------------------------------------------------

test.describe("Faculty avatar placeholders", () => {
  test("every faculty card renders a real photo with descriptive alt text, or a labeled initials fallback", async ({
    page,
  }) => {
    await page.goto("/faculty");

    const images = page.locator("main img, main [role=img]");
    const imgCount = await images.count();

    for (let i = 0; i < imgCount; i++) {
      const img = images.nth(i);
      const alt = (await img.getAttribute("alt")) ?? "";
      const src = await img.getAttribute("src");

      expect(
        alt.trim().length,
        `Faculty image #${i} (src="${src}") has an empty or missing alt attribute — screen reader users get no description`
      ).toBeGreaterThan(0);
      expect(
        /\.(png|jpe?g|webp|gif|svg)$/i.test(alt),
        `Faculty image #${i} alt text ("${alt}") looks like a filename, not a description`
      ).toBe(false);

      if (src) {
        const naturalWidth = await img.evaluate((el) =>
          el instanceof HTMLImageElement ? el.naturalWidth : 1
        );
        expect(
          naturalWidth,
          `Faculty image #${i} (src="${src}", alt="${alt}") loaded with naturalWidth=0 — the image request likely 404'd (broken src)`
        ).toBeGreaterThan(0);
      }
    }

    // Initials-circle fallback (aria-hidden, non-<img>) — assert at least
    // one visible faculty name renders even where no photo exists, so a
    // missing photoSrc never means a blank card.
    const facultyNames = page.locator("main h3, main h2");
    await expect(
      facultyNames.first(),
      "No faculty name headings found on /faculty — cards may be rendering empty when a photo is missing"
    ).toBeVisible();
    expect(
      await facultyNames.count(),
      "/faculty rendered zero named faculty cards"
    ).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// 6. Responsive breakpoints (desktop 1280px / mobile 375px)
//    Runs against whichever project's viewport is active (see
//    playwright.config.ts: "Desktop-1280" / "Mobile-375"), plus one
//    explicit in-test resize to guarantee both widths are exercised even
//    if only a single project is run ad hoc.
// ---------------------------------------------------------------------------

test.describe("Responsive layout", () => {
  test("no horizontal overflow at the current project viewport", async ({ page }, testInfo) => {
    await page.goto("/");
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(
      scrollWidth,
      `Homepage causes horizontal scroll at ${testInfo.project.name} (${clientWidth}px viewport): ` +
        `document.scrollWidth=${scrollWidth} > clientWidth=${clientWidth}. Some element is wider than the viewport.`
    ).toBeLessThanOrEqual(clientWidth + 1); // +1px tolerance for sub-pixel rounding
  });

  test("mobile viewport (375px): nav collapses into a toggleable menu and links stay clickable", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /menu|toggle navigation|open navigation/i });
    const navLinksDesktopStyle = page.getByRole("navigation").getByRole("link");

    const toggleVisible = await toggle.isVisible().catch(() => false);
    const linksVisibleWithoutToggle = (await navLinksDesktopStyle.first().isVisible().catch(() => false));

    expect(
      toggleVisible || linksVisibleWithoutToggle,
      "At 375px width, neither a menu-toggle button nor directly-visible nav links were found — navigation may be inaccessible on mobile"
    ).toBe(true);

    if (toggleVisible) {
      await toggle.click();
      const firstLink = page.getByRole("navigation").getByRole("link").first();
      await expect(
        firstLink,
        "Clicking the mobile menu toggle did not reveal any clickable nav links"
      ).toBeVisible();

      const box = await firstLink.boundingBox();
      expect(
        box,
        "First mobile nav link has no bounding box (not rendered/positioned)"
      ).not.toBeNull();
      expect(
        (box!.width >= 24 && box!.height >= 24),
        `Mobile nav link tap target is only ${box!.width}x${box!.height}px — below the ~24x24px minimum comfortable tap size`
      ).toBe(true);
    }
  });

  test("desktop viewport (1280px): full nav is visible without a toggle", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const navLinks = page.getByRole("navigation").getByRole("link");
    await expect(
      navLinks.first(),
      "At 1280px width, no nav links are directly visible — desktop layout may be incorrectly showing the mobile/collapsed nav"
    ).toBeVisible();
    expect(await navLinks.count(), "Desktop nav has zero visible links").toBeGreaterThan(1);
  });
});
