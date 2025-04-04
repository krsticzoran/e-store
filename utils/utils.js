// count current year

export const getCurrentYear = () => new Date().getFullYear();

// extract text from html code

export function stripHtmlTags(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

// Debounce utility function
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// style for navigation on white background
export function getNavLinksClass(page) {
  return page === "/cart" || page.startsWith("/product/") ? "text-primary" : null;
}
