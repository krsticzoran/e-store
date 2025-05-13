"use client";

import Image from "next/image";
import { sendingEmail } from "@/action/sending-email-action";
import FormButton from "@/components/ui/form-button";
import Container from "@/components/ui/container";
import overLay from "@/public/images/contact/bg-header-overlay-lg-light.webp";

import useFormHandler from "@/hooks/useFormHandler";

export default function Contact() {
  const { ref, message, formAction, handleInputFocus } = useFormHandler(
    sendingEmail.bind(null, "contact"),
  );

  return (
    <>
      <Container>
        <div className="bg-primary">
          <div className="mx-auto max-w-[1320px] pb-[147px] pt-[97px] text-[#FFFFFFCC]">
            <div className="mx-auto flex max-w-[624px] flex-col items-center text-center">
              <h1 className="mb-[22px] font-youngSerif text-5xl leading-[61px] text-white">
                How Can We Help?
              </h1>
              <p className="mb-[10px] text-lg font-medium">
                Tea has a complex positive effect on the body. Daily use of a
                cup of tea is good for your health.
              </p>
            </div>
            <div className="mb-[64px] mt-[30px] flex text-center">
              <div className="w-1/3">
                <i className="fa-regular fa-envelope mb-5 text-4xl text-secondary"></i>
                <h3 className="mb-[10px] text-xs font-bold uppercase text-[#FFFFFF99]">
                  email us
                </h3>
                <p className="text-lg font-medium text-white">
                  <a href="mailto:contact@ochahouse.com">
                    contact@ochahouse.com
                  </a>
                </p>
              </div>
              <div className="w-1/3">
                <i className="fa-solid fa-phone mb-5 text-4xl text-secondary"></i>
                <h3 className="mb-[10px] text-xs font-bold uppercase text-[#FFFFFF99]">
                  give us a call
                </h3>
                <div className="text-lg font-medium text-white">
                  <a href="tel:+65003756435">+6500-37-564-35</a>
                  <p>Monday - Friday 9AM - 5PM EST</p>
                </div>
              </div>
              <div className="w-1/3">
                <i className="fa-brands fa-whatsapp mb-5 text-4xl text-secondary"></i>
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
        />
      </Container>
      <div className="my-[70px]">
        <form action={formAction} ref={ref}>
          <input
            type="email"
            name="email"
            placeholder="email"
            onFocus={handleInputFocus}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="subject"
            onFocus={handleInputFocus}
            required
          />
          <input
            type="text"
            name="message"
            placeholder="message"
            onFocus={handleInputFocus}
            required
          />
          <FormButton className="rounded bg-blue-500 p-2 text-white">
            Submit
          </FormButton>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}
