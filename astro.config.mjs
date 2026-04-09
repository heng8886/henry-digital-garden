import { defineConfig } from 'astro/config';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserSite = repoName.endsWith('.github.io');
const base = process.env.BASE_PATH ?? (repoName && !isUserSite ? `/${repoName}` : '/');
const site =
  process.env.SITE_URL ??
  (process.env.GITHUB_REPOSITORY_OWNER
    ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io`
    : 'https://example.com');

export default defineConfig({
  site,
  base,
});
