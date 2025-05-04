import Container from "@/components/ui/container";
import Banner from "@/components/ui/banner";
import Image from "next/image";
import banner from "@/public/images/shop/banner.webp";
import Link from "next/link";
import ProductSearchBar from "@/components/shop/productsearchbar";
import { categories, tags } from "@/data/shop";
import PriceFilter from "@/components/shop/price-filter";
import SocialIcons from "@/components/ui/social-icons";
import { socialIconsData } from "@/data/socialIconsData";

export default function ShopLayout({ products }) {
  return (
    <Container>
      {/* ===== Hero Banner Section ===== */}
      <Banner title="shop" />
      <div className="mx-5 xl:mx-0">
        {/* ===== Main Shop Content ===== */}
        <div className="mx-auto grid grid-cols-4 py-12 lg:py-20 xl:w-[1280px]">
          {/* =====Left Layout ===== */}
          <div className="col-span-1 mr-7 hidden lg:block">
            {/* Search Bar */}
            <ProductSearchBar />

            {/* Categories  */}
            <div className="mb-10 text-primary">
              <h4 className="mb-4 font-youngSerif text-2xl leading-8">
                Categories
              </h4>
              <ul>
                {categories.map((product, index) => (
                  <li key={index} className="mb-2 font-bold capitalize">
                    <Link href={`/shop/${product.url}`}>{product.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Rnge Filter  */}
            <PriceFilter />
            <div className="mb-10 text-primary">
              <h4 className="mb-4 font-youngSerif text-2xl leading-8">Tags</h4>

              {/* Tags  */}
              <ul className="flex flex-wrap">
                {tags.map((product, index) => (
                  <li
                    key={index}
                    className="mb-[10px] mr-[10px] cursor-pointer border px-[10px] py-[5px] font-bold capitalize hover:border-primary hover:text-secondary"
                  >
                    <Link href={`/shop/${product.url}`}>{product.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Social icoms  */}
            <div className="mb-10 text-primary">
              <h4 className="mb-4 font-youngSerif text-2xl leading-8">
                Follow Us
              </h4>
              <ul className="flex">
                {socialIconsData.map((el, index) => (
                  <li key={index} className="mr-4">
                    <SocialIcons el={el} iconStyle={"opacity-50"} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-4 lg:col-span-3">
            {/* ===== Discount Banner - Right Layout ===== */}
            <div className="relative hidden h-[250px] w-full sm:block">
              <Image src={banner} fill alt="banner" />
              <div className="absolute left-[55px] top-[55px] z-50 text-primary">
                <h3 className="mb-4 font-youngSerif text-3xl leading-8">
                  Get Up to 15% Off Tea
                </h3>
                <p className="mb-9 font-medium">
                  Limited Time Offer on Chai Spiced Oolong
                </p>
                <div>
                  <Link
                    href="/product/166"
                    className="inline-block bg-primary px-[25px] py-[10px] font-bold uppercase tracking-[1px] text-white"
                  >
                    shop now
                  </Link>
                </div>
              </div>
            </div>
            {/* ===== Product list ===== */}
            {products}
          </div>
        </div>
      </div>
    </Container>
  );
}
