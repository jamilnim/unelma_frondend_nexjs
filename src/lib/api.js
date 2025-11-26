import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export const API = axios.create({
  baseURL: BASE_URL,
});

export function getStrapiMedia(media) {
  if (!media) return null;
  if (media.url) return media.url.startsWith("http") ? media.url : `${BASE_URL}${media.url}`;
  if (media.data?.attributes?.url)
    return media.data.attributes.url.startsWith("http")
      ? media.data.attributes.url
      : `${BASE_URL}${media.data.attributes.url}`;
  if (Array.isArray(media.data) && media.data[0]?.attributes?.url)
    return media.data[0].attributes.url.startsWith("http")
      ? media.data[0].attributes.url
      : `${BASE_URL}${media.data[0].attributes.url}`;
  return null;
}

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

export default API;
