import Image from "next/image";

import logo from "@/public/icons/logo.svg";
import FooterLinks from "../ui/footerLinks";
import { discoverData, companyData } from "@/data/footerData";

export default function Footer() {
  return (
    <div className="font-urbanist h-[500px] bg-primary pt-28">
      <div className="mx-auto text-white60 xl:max-w-[1280px]">
        <div className="grid grid-cols-3 gap-10">
          <div className="flex">
            <FooterLinks
              title={companyData.title}
              data={companyData.links}
              addMargin={true}
            />
            <FooterLinks
              title={discoverData.title}
              data={discoverData.links}
              addMargin={false}
            />
          </div>
          <div className="flex flex-col items-center">
            <Image src={logo} width={92} height={93} alt="Company Logo" />
            <p className="mt-10 text-center">
              Tea has a complex positive effect on the body. Daily use of a cup
              of tea is good for your health.
            </p>
          </div>
          <div></div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
