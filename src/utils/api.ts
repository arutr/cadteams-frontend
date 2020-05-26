export default function getApiResource(url, fallback?) {
  if (url?.startsWith('http')) {
    return url;
  }

  return url ? process.env.API_URL + url : fallback;
}
