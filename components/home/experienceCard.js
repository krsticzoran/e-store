import Image from "next/image";

export default function ExperienceCard({ el, index, variant, length }) {
  return (
    <div
      className={`mx-10 py-10 ${index !== length - 1 ? "border-b-[0.5px]" : ""} ${variant === "light" ? "border-accent-secondary" : "flex justify-end border-accent"}`}
    >
      <div
        className={`flex max-w-[360px] ${variant === "light" ? "" : "flex-row-reverse"} `}
      >
        <div
          className={`flex items-center ${variant === "light" ? "mr-5" : "ml-5"} `}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <Image src={el.src} width={25} height={25} alt={el.title} />
          </div>
        </div>
        <div
          className={`${variant === "light" ? "text-primary" : "text-right text-accent-second"}`}
        >
          <h5 className="mb-2 text-lg font-bold">{el.title}</h5>
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
