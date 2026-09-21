import axios from "axios";

// Netlify Functions are served from the same domain as the site.
export const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});
