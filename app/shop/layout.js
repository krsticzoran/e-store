import Container from "@/components/ui/container";
import Banner from "@/components/ui/banner";

import Image from "next/image";
import banner from "@/public/images/shop/banner.webp";
import Link from "next/link";
import ProductSearchBar from "@/components/shop/productsearchbar";

export default async function ShopLayout({ products }) {
  return (
    <Container>
      {/* ===== Hero Banner Section ===== */}
      <Banner title="shop" />
      <div className="mx-5 xl:mx-0">
        {/* ===== Main Shop Content ===== */}
        <div className="mx-auto grid grid-cols-4 py-12 lg:py-20 xl:w-[1280px]">
          <div className="col-span-1 mr-7">
            <ProductSearchBar />
          </div>
          <div className="col-span-3">
            {/* ===== Discount Banner ===== */}
            <div className="relative h-[150px] w-full lg:h-[250px]">
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

            {products}
          </div>
        </div>
      </div>
    </Container>
  );
}
