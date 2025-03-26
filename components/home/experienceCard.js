import Image from "next/image";

export default function ExperienceCard({ el, index, variant, length }) {
  return (
    <div
      className={`mx-10 py-10 lg:flex ${index !== length - 1 ? "border-b-[0.5px]" : ""} ${variant === "light" ? "border-accent-secondary" : "border-accent lg:justify-end"}`}
      aria-label="Experience card"
    >
      <div
        className={`mx-auto max-w-[360px] lg:mx-0 lg:flex ${variant === "light" ? "" : "lg:flex-row-reverse"} `}
      >
        {/* Icon Wrapper */}
        <div
          className={`mb-5 flex justify-center lg:mb-0 ${variant === "light" ? "lg:mr-5" : "lg:ml-5"} `}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
            {/* Experience Icon */}
            <Image src={el.src} width={25} height={25} alt={el.title}  />
          </div>
        </div>

        {/* Text Content */}
        <div
          className={`text-center ${variant === "light" ? "text-primary lg:text-left" : "text-accent-second lg:text-right"}`}
        >
          {/* Title */}
          <h5 className="mb-2 text-lg font-bold">{el.title}</h5>
          {/* Description */}
          <p
            className={`${variant === "light" ? "" : "text-white-transparent"}`}
          >
            {el.text}
          </p>
        </div>
      </div>
    </div>
  );
}
