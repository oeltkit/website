/**
 * Prefix a site-absolute path with the configured base path so internal
 * links work on GitHub Pages project sites (base "/website/") and at the
 * domain root alike. Use for every internal href on marketing pages —
 * Starlight handles its own links.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
