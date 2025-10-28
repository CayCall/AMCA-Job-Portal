// utils/cloudinary.js
export function inlinePdf(url) {
  if (!url) return url;
  // force inline preview
  return url.replace("/upload/", "/upload/fl_inline/");
}
