const currentBase = import.meta.env.BASE_URL ?? '/';
const normalizedBase = currentBase === '/' ? '' : currentBase.replace(/\/$/, '');

export const withBase = (path: string) => {
  if (!path.startsWith('/')) return path;
  if (!normalizedBase) return path;
  return `${normalizedBase}${path}`;
};

export const withoutBase = (pathname: string) => {
  if (!normalizedBase) return pathname;
  return pathname.startsWith(normalizedBase) ? pathname.slice(normalizedBase.length) || '/' : pathname;
};
