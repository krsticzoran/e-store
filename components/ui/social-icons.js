import Link from "next/link";

export default function SocialIcons({ el, iconStyle }) {
  return (
    <Link href={el.link} target="_blank" rel="noopener noreferrer">
      <i
        className={`fab ${el.src} duration-500 hover:text-secondary ${iconStyle}`}
        aria-label={el.title}
      ></i>
    </Link>
  );
}
