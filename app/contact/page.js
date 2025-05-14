import Image from "next/image";
import Container from "@/components/ui/container";
import overLay from "@/public/images/contact/bg-header-overlay-lg-light.webp";
import ContactForm from "@/components/contact/contactForm";

export default function Contact() {
  return (
    <>
      <Container>
        {/* Main contact header section */}
        <div
          className="bg-primary px-5 lg:px-0"
          aria-label="Contact information section"
        >
          <div className="mx-auto max-w-[1320px] pb-[120px] pt-20 text-[#FFFFFFCC] lg:pb-[147px] lg:pt-[97px]">
            {/* Page title and description */}
            <div
              className="mx-auto flex max-w-[624px] flex-col items-center text-center"
              aria-label="Contact page header"
            >
              <h1 className="mb-[22px] font-youngSerif text-4xl leading-[50px] text-white lg:text-5xl lg:leading-[61px]">
                How Can We Help?
              </h1>
              <p className="mb-[10px] text-lg font-medium">
                Tea has a complex positive effect on the body. Daily use of a
                cup of tea is good for your health.
              </p>
            </div>

            {/* Contact methods grid */}
            <div
              className="mb-[64px] mt-[30px] flex flex-col text-center lg:flex-row"
              role="list"
              aria-label="Contact methods"
            >
              {/* Email contact */}
              <div className="lg:w-1/3" role="listitem">
                <i
                  className="fa-regular fa-envelope mb-5 text-4xl text-secondary"
                  aria-hidden="true"
                />
                <h3 className="mb-[10px] text-xs font-bold uppercase text-[#FFFFFF99]">
                  email us
                </h3>
                <p className="text-lg font-medium text-white">
                  <a href="mailto:contact@ochahouse.com">
                    contact@ochahouse.com
                  </a>
                </p>
              </div>

              {/* Phone contact */}
              <div className="mt-10 lg:mt-0 lg:w-1/3" role="listitem">
                <i
                  className="fa-solid fa-phone mb-5 text-4xl text-secondary"
                  aria-hidden="true"
                />
                <h3 className="mb-[10px] text-xs font-bold uppercase text-[#FFFFFF99]">
                  give us a call
                </h3>
                <div className="text-lg font-medium text-white">
                  <a href="tel:+65003756435">+6500-37-564-35</a>
                  <p>Monday - Friday 9AM - 5PM EST</p>
                </div>
              </div>

              {/* WhatsApp contact */}
              <div className="mt-10 lg:mt-0 lg:w-1/3" role="listitem">
                <i
                  className="fa-brands fa-whatsapp mb-5 text-4xl text-secondary"
                  aria-hidden="true"
                />
                <h3 className="mb-[10px] text-xs font-bold uppercase text-[#FFFFFF99]">
                  chat with us
                </h3>
                <div className="text-lg font-medium text-white">
                  <p>Chat is available</p> <p>24 hours / 7-days a week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative bottom edge overlay */}
        <Image
          src={overLay}
          className="absolute bottom-0 h-auto w-full"
          alt="overlay"
          role="presentation"
        />
      </Container>

      {/* Contact form section */}
      <ContactForm />
    </>
  );
}
