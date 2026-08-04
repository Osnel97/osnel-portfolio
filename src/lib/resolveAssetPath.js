/**
 * Resolves a root-relative asset path (e.g. "/assets/profile.jpg") against
 * Vite's configured base URL. Needed because the site can be served from
 * the domain root (Docker/local dev, base "/") or from a sub-path (GitHub
 * Pages project sites, base "/osnel-portfolio/") — a hardcoded leading-slash
 * path in siteData.js would 404 under the sub-path deployment otherwise.
 * Full external URLs (e.g. a testimonial photo hosted elsewhere) are left
 * untouched.
 */
export function resolveAssetPath(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
