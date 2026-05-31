"use client";

import { trackDownload, type TrackProduct, type TrackPlatform, type TrackSurface } from "./trackDownload";

/**
 * TrackedDownloadAnchor — drop-in <a> replacement that fires
 * trackDownload() onClick.
 *
 * Use this from server components (which cannot use onClick directly)
 * when an anchor needs to be tracked. The component renders a regular
 * <a> tag, so all anchor behaviour (download attribute, target, rel,
 * native navigation) is preserved. The track fire-and-forget runs
 * before the navigation; the keepalive flag in trackDownload makes
 * the request survive the page transition.
 */
export function TrackedDownloadAnchor({
  href,
  product,
  platform,
  surface,
  className,
  style,
  children,
  download = false,
  target,
  rel,
}: {
  href: string;
  product: TrackProduct;
  platform: TrackPlatform;
  surface: TrackSurface;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  download?: boolean;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={() => trackDownload({ product, platform, surface })}
      download={download || undefined}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
