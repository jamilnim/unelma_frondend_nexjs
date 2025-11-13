import axios from "axios";

// Axios instance configured for Strapi backend (fallback to localhost)
export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
  headers: { "Content-Type": "application/json" },
});

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Build a full media URL from Strapi media object or string URL.
 * @param {object|string|null} media
 * @returns {string|null} Absolute URL or null if not available
 */
export function getStrapiMedia(media) {
  if (!media) return null;

  if (typeof media === "string") {
    // If media is already a full URL, return as-is, else prepend base URL
    return media.startsWith("http") ? media : `${BASE_URL}${media}`;
  }

  // Typical Strapi media object structure might have URL in these places
  const url =
    media?.data?.attributes?.url || // if media is a relation
    media?.attributes?.url || // if media is direct
    media?.url || // fallback url
    null;

  if (!url) return null;
  return url.startsWith("http") ? url : `${BASE_URL}${url}`;
}

/**
 * Fetch latest blog posts with optional page size.
 * @param {object} options
 * @param {number} options.pageSize
 * @returns {Promise<Array>} List of posts
 */
export async function fetchLatestPosts({ pageSize = 4 } = {}) {
  const url = `/api/blogs?populate=cover&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=${pageSize}`;
  const res = await API.get(url);
  return res.data?.data || [];
}

/**
 * Fetch paginated blog posts.
 * @param {object} options
 * @param {number} options.page
 * @param {number} options.pageSize
 * @returns {Promise<{posts: Array, pagination: object}>}
 */
export async function fetchPostsPage({ page = 1, pageSize = 10 } = {}) {
  const url = `/api/blogs?populate=cover&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  const res = await API.get(url);
  return {
    posts: res.data?.data || [],
    pagination: res.data?.meta?.pagination || null,
  };
}

/**
 * Fetch a single blog post by slug.
 * @param {string} slug
 * @returns {Promise<object|null>} Single post or null
 */
export async function fetchPostBySlug(slug) {
  const url = `/api/blogs?filters[slug][$eq]=${encodeURIComponent(
    slug
  )}&populate=cover,author`;
  const res = await API.get(url);
  return res.data?.data?.[0] || null;
}

/**
 * Upload a media file to Strapi.
 * @param {File} file
 * @param {object} extraFields
 * @returns {Promise<object>} Upload response
 */
export async function uploadMedia(file, extraFields = {}) {
  const form = new FormData();
  form.append("files", file);
  Object.keys(extraFields).forEach((k) => form.append(k, extraFields[k]));

  const res = await API.post("/api/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

/**
 * Set or remove Authorization token for API requests.
 * @param {string|null} token JWT token string or null to remove
 */
export function setAuthToken(token) {
  if (token) API.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete API.defaults.headers.common.Authorization;
}

export default API;

export {
  getStrapiMedia,
  fetchLatestPosts,
  fetchPostsPage,
  fetchPostBySlug,
  uploadMedia,
  setAuthToken,
};
