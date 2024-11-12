export function stripHtmlTags(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}
