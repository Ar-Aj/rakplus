/**
 * AppLink — site-wide `<Link>` wrapper with RSC prefetching disabled.
 *
 * ── WHY THIS EXISTS (production hotfix) ────────────────────────────
 * On `output: 'export'` + `trailingSlash: true`, Next.js 14 prefetches
 * the RSC flight payload for every visible `<Link>` as soon as it enters
 * the viewport. The Navbar (5 links), the Footer (30+ links) and the
 * product grids (21 links) therefore fire 20–60 simultaneous
 * `…/index.txt?_rsc=…` requests on initial paint, on top of the CSS,
 * the JS chunks, the 3D `.glb` models and the frame sequences.
 *
 * On Hostinger LiteSpeed that saturates the per-connection request
 * queue. The browser then drops or times out the critical
 * `/_next/static/css/*.css` and `/_next/static/chunks/*.js` requests —
 * the page renders as raw unstyled HTML, the Preloader freezes on
 * "LOADING 0%", React never hydrates, and every `<Link>` click throws
 * because the router has no client runtime behind it.
 *
 * `prefetch={false}` removes the prefetch storm entirely. Navigation
 * still uses the App Router's client-side transition (the payload is
 * fetched on click, when the user actually wants it), so page
 * switching stays instant — it just stops fighting the critical
 * resources for bandwidth on first load.
 *
 * ── USAGE ──────────────────────────────────────────────────────────
 * Import this instead of `next/link`:
 *
 *     import Link from "@/components/AppLink";
 *
 * The component signature is a drop-in match for `next/link`, so no
 * call site needs to change. `prefetch` is forced to `false` AFTER the
 * prop spread, so a stray `prefetch` prop can never re-enable the
 * storm by accident.
 *
 * No `"use client"` directive: this module is a thin server-compatible
 * wrapper that renders the client-side `next/link` component. Keeping
 * it directive-free lets server components (the products, locations and
 * product-detail pages) use it without pulling an extra client
 * boundary into the tree.
 */

import React from "react";
import NextLink from "next/link";

type AppLinkProps = React.ComponentPropsWithoutRef<typeof NextLink>;

const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  function AppLink({ children, ...props }, ref) {
    return (
      <NextLink ref={ref} {...props} prefetch={false}>
        {children}
      </NextLink>
    );
  }
);

AppLink.displayName = "AppLink";

export default AppLink;
