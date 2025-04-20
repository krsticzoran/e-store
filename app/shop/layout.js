import Container from "@/components/ui/container";
import Banner from "@/components/ui/banner";

import Image from "next/image";
import banner from "@/public/images/shop/banner.webp";

export default async function ShopLayout({ products }) {
  return (
    <Container>
      {/* ===== Hero Banner Section ===== */}
      <Banner title="shop" />
      <div className="mx-5 xl:mx-0">
        {/* ===== Main Shop Content ===== */}
        <div className="mx-auto grid grid-cols-4 py-12 lg:py-20 xl:w-[1280px]">
          <div className="col-span-1"></div>
          <div className="col-span-3">
            <div className="relative h-[150px] w-full lg:h-[250px]">
              <Image src={banner} fill alt="banner" />
              <div className="absolute top-1/2 z-50 text-primary">
                <h1>Get Up to 15% Off Tea</h1>
              </div>
            </div>

            {products}
          </div>
        </div>
      </div>
    </Container>
  );
}
