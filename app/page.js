import Image from "next/image";
const consumerKey = process.env.WOO_COMMERCE_CONSUMER_KEY;
const consumerSecret = process.env.WOO_COMMERCE_CONSUMER_SECRET;

export default async function Home() {
  // Fetch posts from the WordPress API
  const response = await fetch(
    `https://sweetconceptbym.ba/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&per_page=100`,
    {
      next: { revalidate: 10 },
    }
  );
  const posts = await response.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((product) => (
            <div
              key={product.id}
              className="product-item p-4 border rounded shadow"
            >
              <a href={product.permalink}>
                {product.images[0] && (
                  <Image
                    src={product.images[0].src}
                    alt={product.name}
                    width={300} // Set the width as needed
                    height={300} // Set the height as needed
                    className="w-full h-auto rounded"
                  />
                )}
                <h2 className="product-name text-lg font-semibold mt-2">
                  {product.name}
                </h2>
                <p className="product-categories text-gray-500">
                  Categories:{" "}
                  {product.categories.map((cat) => cat.name).join(", ")}
                </p>
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
