// Spot photos are full-size Cloudinary originals (4–6 MB each). Cloudinary can resize,
// compress and pick the best format on the fly, so ask it for a version the size we show.
export function img(url, width = 800) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  if (/\/upload\/[^/]*w_\d+/.test(url)) return url; // already transformed
  return url.replace('/upload/', `/upload/c_limit,w_${width},q_auto,f_auto/`);
}
