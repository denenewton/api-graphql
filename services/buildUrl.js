export default function buildUrl(title) {
  if (title.includes("&")) {
    const parts = title.split("&");
    const url = parts[0].length > 2 ? parts[0] : parts[1];
    return url;
  }
  if (title.includes(",")) {
    const parts = title.split(",");
    const url = parts[0].length > 2 ? parts[0] : parts[1];
    return url.toString();
  }

  return title;
}
