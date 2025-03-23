import Image from "next/image";
import SocialIcons from "@/components/ui/social-icons";

import logo from "@/public/icons/logo.svg";
import Subscription from "./ subscription";

import FooterLinks from "./footerLinks";

import { discoverData, companyData } from "@/data/footerData";
import { socialIconsData } from "@/data/socialIconsData";

import { getCurrentYear } from "@/utils/utils";

export default function Footer() {
  return (
    <div className="bg-primary pt-20 font-urbanist text-white60 lg:pt-28">
      <div className="mx-auto px-5 xl:max-w-[1280px] xl:px-0">
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {/*first column*/}
          <div className="flex justify-center md:justify-start">
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
          {/*second column*/}
          <div className="mt-14 flex flex-col items-center md:mt-0">
            <Image src={logo} width={92} height={93} alt="Company Logo" />
            <p className="mt-10 text-center">
              Tea has a complex positive effect on the body. Daily use of a cup
              of tea is good for your health.
            </p>
          </div>
          {/*third column*/}
          <div className="mt-14 lg:ml-10 lg:mt-0 xl:ml-20">
            <h3 className="text-center font-bold uppercase text-white md:text-start">
              SIGN UP AND SAVE
            </h3>
            <p className="mt-6 text-center md:text-start lg:mt-10">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            {/*subscription*/}
            <Subscription />
            {/*social icons*/}
            <ul className="mt-4 flex justify-center md:justify-start lg:mt-8">
              {socialIconsData.map((el, i) => (
                <li
                  key={i}
                  className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFFFF33] p-2"
                >
                  <SocialIcons el={el} i={i} iconStyle="text-white" />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/*Copyright column*/}
        <div className="mt-12 flex justify-center border-t-[0.5px] border-[#FFFFFF1A] font-medium lg:mt-20">
          <p className="py-5 text-center">{`Copyright © ${getCurrentYear()} Ocha House. All Rights Reserved`}</p>
        </div>
      </div>
    </div>
  );
}
