export const parseUrl = (base, url) => {
  if (!url) return '/';
  return !url.startsWith('http') ? `${base}${url.startsWith('/') ? url : `/${url}`}` : url;
};