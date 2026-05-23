// Prepends the Vite base URL to public folder asset paths
// This fixes image paths on GitHub Pages subdirectory deployments
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
