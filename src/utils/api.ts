export default function getApiResource(url, fallback?) {
  if (url?.startsWith('http')) {
    return url;
  }

  if (url) {
    return process.env.API_URL + url;
  }

  return fallback ? process.env.API_URL + fallback : null;
}
