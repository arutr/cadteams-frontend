export function getApiResource(url, fallback?) {
  if (url?.startsWith('http')) {
    return url;
  }

  if (url) {
    return process.env.API_URL + url;
  }

  if (fallback?.startsWith('http')) {
    return fallback;
  }

  return fallback ? process.env.API_URL + fallback : null;
}

export function getErrorMessage(error) {
  if (error?.response?.data?.message[0]?.messages) {
    return error.response.data.message[0].messages[0]?.message;
  }

  return 'Unknown error has occurred. Please refresh the page.';
}
