import axios from "axios";

// Base URL for your Strapi backend
export const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Convert Strapi media object to absolute URL
 */
export function getStrapiMedia(media) {
  if (!media) return null;

  // Direct URL
  if (media.url) return media.url.startsWith("http") ? media.url : `${BASE_URL}${media.url}`;

  // Single relation object
  if (media.data?.attributes?.url)
    return media.data.attributes.url.startsWith("http")
      ? media.data.attributes.url
      : `${BASE_URL}${media.data.attributes.url}`;

  // Array relation
  if (Array.isArray(media.data) && media.data[0]?.attributes?.url)
    return media.data[0].attributes.url.startsWith("http")
      ? media.data[0].attributes.url
      : `${BASE_URL}${media.data[0].attributes.url}`;

  return null;
}

/**
 * Get Strapi Image URL (your requested helper)
 */
export function getStrapiImage(imageObj) {
  if (!imageObj) return null;

  const url =
    imageObj.url ||
    imageObj?.formats?.medium?.url ||
    imageObj?.formats?.small?.url ||
    imageObj?.formats?.thumbnail?.url;

  if (!url) return null;

  return url.startsWith("http") ? url : `${BASE_URL}${url}`;
}

/**
 * Fetch latest posts with cover populated
 */
export async function fetchLatestPosts({ pageSize = 4 } = {}) {
  const url = `/api/blogs?populate=cover&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=${pageSize}`;
  const res = await API.get(url);
  return res.data?.data || [];
}

/**
 * ✅ Fetch About Page Data (NEW)
 * populate=* gives image + strengths + users + detailStory
 */
export async function fetchAboutAPI() {
  const url = `/api/abouts?populate=*`;
  const res = await API.get(url);

  return res.data?.data?.[0] || null;
}

export default API;
