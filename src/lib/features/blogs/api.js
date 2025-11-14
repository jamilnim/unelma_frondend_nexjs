import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

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

  // Single relation
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
 * Fetch latest posts with cover populated
 */
export async function fetchLatestPosts({ pageSize = 4 } = {}) {
  const url = `/api/blogs?populate=cover&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=${pageSize}`;
  const res = await API.get(url);
  return res.data?.data || [];
}

export default API;
