import Image from "next/image";
import Link from "next/link";

import logo from "@/public/icons/logo.svg";
import email from "@/public/icons/mail.png";

import FooterLinks from "../ui/footerLinks";

import { discoverData, companyData } from "@/data/footerData";
import { footerIconsData } from "@/data/footerData";

import { getCurrentYear } from "@/lib/utils";

export default function Footer() {
  return (
    <div className="font-urbanist text-white60  bg-primary pt-28">
      <div className="mx-auto  xl:max-w-[1280px]">
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
          {/*third column*/}
          <div>
            <h3 className="font-bold uppercase text-white">SIGN UP AND SAVE</h3>
            <p className="mt-10">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            {/*subscription*/}
            <div className="relative mt-8">
              <input
                className="w-full border-b bg-primary pb-2 outline-none"
                type="email"
                value="Enter your email"
              />
              <Image
                src={email}
                width={20}
                height={20}
                alt="email"
                className="absolute bottom-3 right-2"
              />
            </div>
            {/*social icons*/}
            <ul className="mt-8 flex">
              {footerIconsData.map((el, i) => (
                <li
                  key={i}
                  className="gropup transition-scale mr-4 rounded-full bg-[#FFFFFF33] p-2 duration-500 hover:scale-110"
                >
                  <Link href={el.link}>
                    <Image src={el.src} alt={el.alt} width={18} height={18} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-20 flex justify-center border-t-[0.5px] border-[#FFFFFF1A] font-medium ">
            <p className="py-5">{`Copyright © ${getCurrentYear()} Ocha House. All Rights Reserved`}</p>
        </div>
      </div>
    </div>
  );
}
