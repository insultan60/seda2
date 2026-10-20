/**
 * The journal is parked behind a "coming soon" page until there is real
 * content to publish. While this is false: /journal shows the coming-soon
 * panel (noindex), every /journal/<slug> redirects there (next.config.ts),
 * the home page drops its journal section, the posts are out of the sitemap,
 * and the menus no longer link to it. Set it to true to bring all of that
 * back as it was.
 *
 * Its own file, with no imports, so next.config.ts can read it too.
 */
export const JOURNAL_LIVE = false;
