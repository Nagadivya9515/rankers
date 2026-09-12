"use client";

import type { AppLink, AppPlatform } from "@/lib/types";
import { getAppLinks } from "@/lib/data";
import { LaptopIcon, MonitorIcon, SmartphoneIcon } from "./icons/DeviceIcons";

const PLATFORM_ICON: Record<AppPlatform, (props: { className?: string }) => JSX.Element> = {
  android: SmartphoneIcon,
  windows: MonitorIcon,
  mac: LaptopIcon,
};

interface AppDownloadBadgesProps {
  /** "dark" for use on the deep-green hero/app section, "light" for white/cream surfaces. */
  tone?: "dark" | "light";
  /** "row" for horizontal badge buttons, "compact" for a tighter footer-style list. */
  variant?: "row" | "compact";
  className?: string;
}

/**
 * Reusable "Get the App" badge row for Android / Windows / Mac. Uses
 * generic device icons (see components/icons/DeviceIcons.tsx) rather than
 * official store marks, and any link still pointing at the "#" placeholder
 * renders as "Coming Soon" instead of a dead but clickable-looking link —
 * swap in real store URLs in data/apps.json when they exist.
 */
export default function AppDownloadBadges({
  tone = "dark",
  variant = "row",
  className = "",
}: AppDownloadBadgesProps) {
  const apps = getAppLinks();

  const baseClasses =
    tone === "dark"
      ? "border-white/15 bg-white/5 text-white hover:border-gold-400/60 hover:bg-white/10"
      : "border-brand-100 bg-white text-brand-800 hover:border-gold-300 hover:bg-gold-50";

  if (variant === "compact") {
    return (
      <ul className={`space-y-2.5 ${className}`}>
        {apps.map((app) => (
          <AppBadgeItem key={app.id} app={app} tone={tone} compact />
        ))}
      </ul>
    );
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {apps.map((app) => (
        <a
          key={app.id}
          href={app.url}
          target={app.url === "#" ? undefined : "_blank"}
          rel={app.url === "#" ? undefined : "noopener noreferrer"}
          aria-disabled={app.url === "#"}
          onClick={app.url === "#" ? (e) => e.preventDefault() : undefined}
          className={`group flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover ${baseClasses}`}
        >
          <PlatformIconFor platform={app.platform} className="h-5 w-5 shrink-0 text-gold-400 transition-transform duration-300 group-hover:scale-110" />
          <span className="flex flex-col leading-tight">
            <span
              className={`text-[10px] font-medium uppercase tracking-wide ${
                tone === "dark" ? "text-brand-200" : "text-brand-500"
              }`}
            >
              {app.url === "#" ? "Coming soon on" : "Get it on"}
            </span>
            <span>{app.store}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

function AppBadgeItem({
  app,
  tone,
  compact,
}: {
  app: AppLink;
  tone: "dark" | "light";
  compact?: boolean;
}) {
  const textClass = tone === "dark" ? "text-brand-200 hover:text-white" : "text-brand-600 hover:text-brand-900";
  return (
    <li>
      <a
        href={app.url}
        target={app.url === "#" ? undefined : "_blank"}
        rel={app.url === "#" ? undefined : "noopener noreferrer"}
        aria-disabled={app.url === "#"}
        onClick={app.url === "#" ? (e) => e.preventDefault() : undefined}
        className={`flex items-center gap-2 text-sm font-medium transition-colors ${textClass}`}
      >
        <PlatformIconFor platform={app.platform} className="h-4 w-4 shrink-0" />
        {app.store}
        {app.url === "#" && compact && (
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
            Soon
          </span>
        )}
      </a>
    </li>
  );
}

function PlatformIconFor({ platform, className }: { platform: AppPlatform; className?: string }) {
  const Icon = PLATFORM_ICON[platform];
  return <Icon className={className} />;
}
