const BASE_URL = import.meta.env.VITE_API_URL
  || (import.meta.env.PROD ? 'https://ibm-ecommerce-website.onrender.com' : '');

export const API_BASE_URL = BASE_URL;

export function api(path, options = {}) {
  return fetch(BASE_URL + path, {
    ...options,
    credentials: 'include',
  });
}
