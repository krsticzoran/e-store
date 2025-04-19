import background from "@/public/images/bg_shop.webp";
import Image from "next/image";

export default function Banner({ title }) {
  return (
    <div className="relative h-[150px] w-full lg:h-[250px]">
      {/* Background Image */}
      <Image src={background} alt="background" fill priority />
      {/* Page Title */}
      <h1 className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 font-youngSerif text-5xl capitalize leading-[61px] text-primary">
        {title}
      </h1>
    </div>
  );
}
