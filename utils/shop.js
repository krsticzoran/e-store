// function return product sorted by date or price
export function sortProducts(products, sortBy) {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "date-newest":
        return new Date(b.date_created) - new Date(a.date_created);
      case "date-oldest":
        return new Date(a.date_created) - new Date(b.date_created);
      default:
        return 0; // Default sorting
    }
  });
}

export const categories = [
  { title: "green tea", url: "green-tea" },
  { title: "guayusa", url: "guayusa" },
  { title: "black tea", url: "black-tea" },
  { title: "flavored tea", url: "flavored-tea" },
  { title: "oolong tea", url: "oolong-tea" },
];
