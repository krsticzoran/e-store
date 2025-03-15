// count current year

export const getCurrentYear = () => new Date().getFullYear();

// extract text from html code

export function stripHtmlTags(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}
